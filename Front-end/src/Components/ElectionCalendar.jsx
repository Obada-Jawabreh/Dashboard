import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ElectionCalendar = () => {
  const [electionName, setElectionName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("Pending");

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/elections/election", {
        electionName,
        electoralDistrict: "",  // أو إرسال القيمة المطلوبة إذا كانت موجودة
        electoralLists: [],  // أو إرسال القيمة المطلوبة إذا كانت موجودة
        startDate,
        endDate,
        status,
        electionType: "Local",  // تأكد من إرسال النوع الصحيح
      });
      console.log("Election saved:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error saving election:", error.response.data);
      } else {
        console.error("Error saving election:", error.message);
      }
    }
  };
  
  

  const updateStatus = () => {
    const currentTime = new Date();
    if (currentTime < new Date(startDate)) {
      setStatus("Pending");
    } else if (
      currentTime >= new Date(startDate) &&
      currentTime <= new Date(endDate)
    ) {
      setStatus("Ongoing");
    } else {
      setStatus("Completed");
    }
  };

  const handlePublish = () => {
    handleSave(); // حفظ البيانات في قاعدة البيانات
    alert("Election has been published successfully!"); // رسالة تأكيدية للنشر
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
      <h2 className="mb-6 text-2xl font-semibold">Election Calendar</h2>
      <input
        type="text"
        placeholder="Enter Election Name"
        value={electionName}
        onChange={(e) => setElectionName(e.target.value)}
        className="mb-4 p-2 w-full max-w-md text-lg border rounded-md border-gray-300"
      />
      <div className="flex justify-between w-full max-w-md mb-6">
        <div>
          <label className="block mb-2">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="Pp"
            placeholderText="Select Start Date"
            className="p-2 w-full max-w-md text-lg border rounded-md border-gray-300 placeholder-gray-500 placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="Pp"
            placeholderText="Select End Date"
            className="p-2 border rounded-md border-gray-300"
          />
        </div>
      </div>
      <div className="mb-6 text-lg">
        <p>
          Status: <strong>{status}</strong>
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save Election
        </button>
        <button
          onClick={updateStatus}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Update Status
        </button>
        <button
          onClick={handlePublish}
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Publish Election
        </button>
      </div>
    </div>
  );
};

export default ElectionCalendar;
