import React, { useState } from "react";
import axios from "axios";
import DistrictVoteChart from "./DistrictVoteChart";
import CandidateVoteChart from "./CandidateVoteChart";

const VoteTable = () => {
  const [districtId, setDistrictId] = useState("");
  const [listsData, setListsData] = useState([]);
  const [totalVoteCount, setTotalVoteCount] = useState(null);
  const [numberOfSeats, setNumberOfSeats] = useState(null);
  const [threshold, setThreshold] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState(""); // فلتر نوع البيانات

  const handleFetchData = async () => {
    try {
      if (!districtId) {
        setError("مطلوب إدخال معرف الدائرة");
        return;
      }

      // جلب بيانات الأصوات
      const votesResponse = await axios.get(
        "http://localhost:5000/api/VoteCount/localList/get-TotalVoteCountForAllList",
        { params: { districtId } }
      );

      // جلب عدد المقاعد
      const seatsResponse = await axios.get(
        "http://localhost:5000/api/VoteCount/localList/seats",
        { params: { districtId } }
      );

      // جلب بيانات المرشحين مع الفلتر
      let candidatesUrl = `http://localhost:5000/api/candidates/${districtId}`;
      if (filter) {
        candidatesUrl += `/${filter}`; // إضافة الفلتر إلى URL
      }
      const candidatesResponse = await axios.get(candidatesUrl);

      // تحقق من بيانات المرشحين
      console.log("Candidates Data:", candidatesResponse.data);

      const votes = votesResponse.data.lists.map((list) => list.vote_count);
      const totalVotes = votesResponse.data.totalVotes;
      const seats = seatsResponse.data.number_of_seats;

      // حساب العتبة
      const thresholdValue = 0.07 * totalVotes;
      setThreshold(thresholdValue);

      // تصفية الأصوات التي تتجاوز العتبة
      const filteredLists = votesResponse.data.lists.map((item) => ({
        ...item,
        exceedsThreshold: item.vote_count >= thresholdValue,
        candidates: candidatesResponse.data
          .filter((candidate) => candidate.list_name === item.list_name)
          .sort((a, b) => b.vote_count - a.vote_count),
      }));

      // تحقق من البيانات المصفاة
      console.log("Filtered Lists:", filteredLists);

      // إذا لم يكن هناك أصوات تتجاوز العتبة
      if (filteredLists.filter((list) => list.exceedsThreshold).length === 0) {
        setListsData(
          filteredLists.map((list) => ({
            ...list,
            initial_integer_part: 0,
            decimal_part: 0,
            final_seats: 0,
          }))
        );
        setTotalVoteCount(totalVotes);
        setNumberOfSeats(seats);
        setError("لا توجد أصوات تتجاوز العتبة");
        return;
      }

      // حساب مجموع الأصوات التي تجاوزت العتبة
      const totalVotesAboveThreshold = filteredLists
        .filter((list) => list.exceedsThreshold)
        .reduce((a, b) => a + b.vote_count, 0);

      // حساب النتيجة لكل قائمة
      const results = filteredLists.map((item) =>
        item.exceedsThreshold
          ? (seats / totalVotesAboveThreshold) * item.vote_count
          : 0
      );

      // حساب الرقم الصحيح والرقم العشري لكل قائمة
      const initialIntegerParts = results.map((result) => Math.floor(result));
      const decimalParts = results.map((result) => result - Math.floor(result));

      // حساب المجموع الحالي للأجزاء الصحيحة
      const totalInitialIntegerParts = initialIntegerParts.reduce(
        (a, b) => a + b,
        0
      );

      // عدد المقاعد المطلوب إضافته
      const seatsNeeded = seats - totalInitialIntegerParts;

      // ترتيب الأرقام العشرية من الأعلى إلى الأدنى
      const sortedDecimalParts = decimalParts
        .map((decimal, index) => ({ decimal, index }))
        .sort((a, b) => b.decimal - a.decimal);

      // إضافة المقاعد بناءً على الأرقام العشرية
      const finalSeats = [...initialIntegerParts];
      for (let i = 0; i < seatsNeeded; i++) {
        const highestDecimal = sortedDecimalParts[i];
        if (highestDecimal) {
          finalSeats[highestDecimal.index] += 1;
        }
      }

      // إعداد البيانات النهائية
      const finalData = filteredLists.map((item, index) => ({
        list_name: item.list_name,
        vote_count: item.vote_count,
        initial_integer_part: item.exceedsThreshold
          ? initialIntegerParts[index]
          : 0,
        decimal_part: item.exceedsThreshold ? decimalParts[index] : 0,
        final_seats: item.exceedsThreshold ? finalSeats[index] : 0,
        exceedsThreshold: item.exceedsThreshold,
        candidates: item.candidates.map((candidate) => ({
          name: candidate.name,
          vote_count: candidate.vote_count,
        })),
      }));

      setListsData(finalData);
      setTotalVoteCount(totalVotes);
      setNumberOfSeats(seats);
      setError("");
    } catch (err) {
      setError("خطأ في جلب البيانات");
      console.error("Error:", err);
    }
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    // عند تغيير الفلتر، يمكن إلغاء إدخال رقم الدائرة إذا لزم الأمر
    setDistrictId("");
  };

  return (
    // <div className="container mx-auto p-6 bg-gray-100 min-h-screen rtl">
    //   <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
    //     <div className="bg-black text-white p-6 text-right">
    //       <h1 className="text-3xl font-bold">
    //   عداد الأصوات بالقوائم المحلية حسب الدائرة
    // </h1>
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen rtl">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-black text-white p-6 text-right">
          <h1 className="text-3xl font-bold">
            عداد الأصوات بالقوائم المحلية حسب الدائرة
          </h1>
        </div>
        <div className="p-6">
          <div className="mb-6 flex items-center">
            <button
              onClick={handleFetchData}
              className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              بيانات الأصوات
            </button>
            <input
              type="text"
              placeholder="ادخل رقم الدائرة"
              name="districtId"
              id="districtId"
              className="flex-1 min-w-[150px] text-right p-2 focus:ring-black focus:border-black block w-full rounded-md sm:text-sm border-gray-300"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
            />
            <select
              onChange={handleFilterChange}
              className="ml-3 p-2 border border-gray-300 rounded-md"
              value={filter}
            >
              <option value="">اختر فلتر</option>
              <option value="ذكر/مسلم">مسلم وذكر</option>
              <option value="أنثى">أنثى</option>
              <option value="ذكر/مسيحي">مسيحي وذكر</option>
              <option value="ذكر/شركسي">شركسي وذكر</option>
            </select>
          </div>

          {error && <p className="text-red-500 mt-4 text-right">{error}</p>}

          {listsData.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rtl">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        اسم القائمة
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        الأصوات
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        الأرقام الصحيحة الأولية
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        الأرقام العشرية
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        عدد المقاعد النهائي
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        أسماء المرشحين
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listsData.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        style={{
                          backgroundColor: !item.exceedsThreshold ? "red" : "",
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.list_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.vote_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.initial_integer_part}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.decimal_part.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.final_seats}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.candidates.length > 0 ? (
                            <ul className="list-disc list-inside">
                              {item.candidates.map((candidate, i) => (
                                <li key={i}>
                                  {candidate.name} ({candidate.vote_count}{" "}
                                  أصوات)
                                </li>
                              ))}
                            </ul>
                          ) : (
                            "لا يوجد مرشحين"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8">
                <DistrictVoteChart listsData={listsData} />
              </div>
              <div className="mt-8">
                <CandidateVoteChart listsData={listsData} />
              </div>
            </>
          )}

          {(totalVoteCount !== null || numberOfSeats !== null) && (
            <div className="mt-8 bg-white rounded-lg p-6 shadow-md text-right">
              <h2 className="text-xl font-semibold mb-2">
                إجمالي الأصوات لجميع القوائم
              </h2>
              <p className="text-3xl font-bold text-black">
                {totalVoteCount} (عدد مقاعد الدائرة: {numberOfSeats})
              </p>
              {threshold !== null && (
                <p className="text-lg text-gray-700 mt-4">
                  قيمة العتبة: {threshold.toFixed(2)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoteTable;









