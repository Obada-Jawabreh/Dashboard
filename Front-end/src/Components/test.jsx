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

    const activationInfo = list.list_activation
      ? `<h3 style="margin-bottom: 16px;">عدد الأصوات: ${
          list.list_vote_count || "غير متوفر"
        }</h3>`
      : "";

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
        // Show alert to confirm the action
        Swal.fire({
          title: "هل أنت متأكد؟",
          text: "أنت على وشك قبول القائمة!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم، قبول",
          cancelButtonText: "إلغاء",
        }).then((confirmation) => {
          if (confirmation.isConfirmed) {
            Swal.fire("تم القبول!", "تم قبول القائمة بنجاح.", "success");
            // هنا يمكنك تنفيذ أي عملية تريدها بعد القبول
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Show alert to confirm the action
        Swal.fire({
          title: "هل أنت متأكد؟",
          text: "أنت على وشك رفض القائمة!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم، رفض",
          cancelButtonText: "إلغاء",
        }).then((confirmation) => {
          if (confirmation.isConfirmed) {
            Swal.fire("تم الرفض!", "تم رفض القائمة بنجاح.", "success");
            // هنا يمكنك تنفيذ أي عملية تريدها بعد الرفض
          }
        });
      }
    });
  };

  const filteredLists = groupedLists.filter((list) => {
    const isLocal = list.list_activation !== undefined;
    const listType = isLocal ? "محلية" : "حزبية";
    const listStatus = isLocal
      ? list.list_activation
        ? "مرشحة"
        : "غير مرشحة"
      : "غير متوفر";

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">لوحة إدارة الانتخابات</h1>
      <div className="mb-4 flex space-x-4">
        <select
          value={selectedListType}
          onChange={(e) => setSelectedListType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">كل القوائم</option>
          <option value="محلية">القوائم المحلية</option>
          <option value="حزبية">القوائم الحزبية</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">كل الحالات</option>
          <option value="مرشحة">مرشحة</option>
          <option value="غير مرشحة">غير مرشحة</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLists.map((list) => (
          <div key={list.list_id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{list.list_name}</h2>
            <p className="mb-2">
              {list.list_activation !== undefined ? "محلية" : "حزبية"}
            </p>
            <p className="mb-2">
              الحالة: {list.list_activation ? "مرشحة" : "غير مرشحة"}
            </p>
            <p className="mb-2">عدد المرشحين: {list.candidates.length}</p>
            <button
              onClick={() => handleShowList(list)}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              عرض القائمة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;

