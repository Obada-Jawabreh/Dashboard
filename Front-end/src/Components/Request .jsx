import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Request = () => {
  const [groupedLists, setGroupedLists] = useState([]);
  const [selectedListType, setSelectedListType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLists = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/req/local`);
      const lists = response.data;

      // Group candidates by list
      const grouped = lists.reduce((acc, item) => {
        if (!acc[item.list_id]) {
          acc[item.list_id] = {
            list_id: item.list_id,
            list_name: item.list_name,
            list_activation: item.list_activation,
            list_vote_count: item.list_vote_count,
            candidates: [],
          };
        }
        acc[item.list_id].candidates.push({
          national_id: item.national_id,
          name: item.name,
          vote_count: item.candidate_vote_count,
          activation: item.candidate_activation,
        });
        return acc;
      }, {});

      setGroupedLists(Object.values(grouped));
    } catch (error) {
      console.error(`Error fetching lists:`, error);
      setError("حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleShowList = async (list) => {
    let candidatesTable = "";

    for (let candidate of list.candidates) {
      let candidateName = candidate.name || "غير متوفر";

      if (!candidate.name) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/req/candidates/${candidate.national_id}`
          );
          const candidateData = response.data[0];
          candidateName = candidateData.name || "غير متوفر";
        } catch (error) {
          console.error(`Error fetching candidate name:`, error);
          candidateName = "غير متوفر";
        }
      }

      candidatesTable += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
            candidate.vote_count || "غير متوفر"
          }</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${candidateName}</td>
        </tr>
      `;
    }

    const activationInfo =
      list.list_activation !== null
        ? `<h3 style="margin-bottom: 16px;">عدد الأصوات: ${
            list.list_vote_count || "غير متوفر"
          }</h3>`
        : "<h3 style='margin-bottom: 16px;'>الحالة: قيد الانتظار</h3>";

    Swal.fire({
      title: list.list_name,
      html: `
            ${activationInfo}
            <h3 style="margin-bottom: 16px;">المرشحون:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">عدد الأصوات</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">اسم المرشح</th>
                </tr>
              </thead>
              <tbody>
                ${candidatesTable}
              </tbody>
            </table>
          `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "قبول",
      cancelButtonText: "رفض",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "هل أنت متأكد؟",
          text: "أنت على وشك قبول القائمة!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم، قبول",
          cancelButtonText: "إلغاء",
        }).then((confirmation) => {
          if (confirmation.isConfirmed) {
            // Update database with accepted status
            try {
              const response = axios.patch(
                `http://localhost:5000/api/req/edit-list-t/${list.list_id}`,
                {}
              );
              console.log("Response:", response); // Log response to check for issues
              Swal.fire("تم القبول!", "تم قبول القائمة بنجاح.", "success");
              fetchLists(); // Refresh the list data
            } catch (error) {
              console.error(
                "Error updating list:",
                error.response || error.message || error
              );
              Swal.fire("خطأ!", "حدث خطأ أثناء تحديث الحالة.", "error");
            }
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "هل أنت متأكد؟",
          text: "أنت على وشك رفض القائمة!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم، رفض",
          cancelButtonText: "إلغاء",
        }).then((confirmation) => {
          if (confirmation.isConfirmed) {
            // Update database with rejected status
            try {
              const response =  axios.patch(
                `http://localhost:5000/api/req/edit-list-f/${list.list_id}`,
                {}
              );
              console.log("Response:", response); // سجل الاستجابة للتحقق من وجود أي مشاكل
              Swal.fire("تم الرفض!", "تم رفض القائمة بنجاح.", "success");
              fetchLists(); // تحديث البيانات بعد قبول القائمة
            } catch (error) {
              console.error(
                "Error updating list:",
                error.response || error.message || error
              );
              Swal.fire("خطأ!", "حدث خطأ أثناء تحديث الحالة.", "error");
            }
          }
        });
      }
    });
  };

  const filteredLists = groupedLists.filter((list) => {
    const listType =
      list.list_activation !== undefined
        ? list.list_activation === null
          ? "محلية"
          : "محلية"
        : "حزبية";
    const listStatus =
      list.list_activation === null
        ? "قيد الانتظار"
        : list.list_activation
        ? "مرشحة"
        : "مرفوضة";

    return (
      (selectedListType === "all" || listType === selectedListType) &&
      (selectedStatus === "all" ||
        (listStatus !== "غير متوفر" && listStatus === selectedStatus))
    );
  });

  if (isLoading) {
    return <div className="p-4">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 text-right">
      <h1 className="text-2xl font-bold mb-4">لوحة إدارة الانتخابات</h1>
      <div className="mb-4 flex space-x-4 justify-end">
        <select
          value={selectedListType}
          onChange={(e) => setSelectedListType(e.target.value)}
          className="p-2 border rounded text-right"
        >
          <option value="all">كل القوائم</option>
          <option value="محلية">القوائم المحلية</option>
          <option value="حزبية">القوائم الحزبية</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2 border rounded text-right"
        >
          <option value="all">كل الحالات</option>
          <option value="مرشحة">مرشحة</option>
          <option value="مرفوضة">مرفوضة</option>
          <option value="قيد الانتظار">قيد الانتظار</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLists.map((list) => {
          const statusColor =
            list.list_activation === null
              ? "text-yellow-500"
              : list.list_activation
              ? "text-green-500"
              : "text-red-500";

          return (
            <div
            key={list.list_id}
            className="border rounded-lg p-4 shadow-md bg-white transition-transform transform hover:translate-y-2"
            style={{ transition: "transform 0.3s ease" }}
          >
            <h2 className="text-xl font-semibold mb-2">{list.list_name}</h2>
            <p className="mb-2">محلية</p>
            <p className={`mb-2 ${statusColor}`}>
              الحالة:{" "}
              {list.list_activation === null
                ? "قيد الانتظار"
                : list.list_activation
                ? "مرشحة"
                : "مرفوضة"}
            </p>
            <p className="mb-2">عدد الأصوات: {list.list_vote_count}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleShowList(list)}
            >
              عرض القائمة
            </button>
          </div>
          
          );
        })}
      </div>
    </div>
  );
};

export default Request;
