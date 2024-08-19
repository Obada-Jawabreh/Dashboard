import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Debate_screen() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
    setRoomId(randomId + timestamp);
  };

  const handleOneAndOneCall = () => {
    if (!roomId) {
      alert("Please Generate Room Id First");
      return;
    }
    navigate(`/Debate-Room/${roomId}?type=one-on-one`);
  };

  const handleGroupCall = () => {
    if (!roomId) {
      alert("Please Generate Room Id First");
      return;
    }
    navigate(`/DebateRoom/${roomId}?type=group-call`);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center font-sans"
      style={{ backgroundImage: 'url("/picture.jpg")' }}
    >
      <div className="text-center w-full max-w-md bg-white bg-opacity-80 p-8 rounded-md">
        <h1 className="text-4xl mb-4 text-[#8E1B3B]">
          أهــلاً وســـهـلاً بـك فــي خـدمـة الـمــناظــرات الـمرئــية
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          قُــم بإنــشاء مــعرف الــغـرفـة الخـاص بالــمناظرة
        </p>
        <div className="flex flex-col items-center mb-4 space-y-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full text-lg text-right bg-gray-50"
            placeholder="Generated Room ID"
            value={roomId}
            readOnly
            dir="rtl"
          />
          <button
            className="bg-[#8E1B3B] text-white px-6 py-2 rounded-md hover:bg-[#72152d] transition duration-300"
            onClick={handleRoomIdGenerate}
          >
            إنــشاء المـعرف
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <Link to="/">
            <button className="bg-[#8E1B3B] text-white px-6 py-2 rounded-md hover:bg-[#72152d] transition duration-300">
              الـرجـوع
            </button>
          </Link>
          <button
            className="bg-[#8E1B3B] text-white px-6 py-2 rounded-md hover:bg-[#72152d] transition duration-300"
            onClick={handleGroupCall}
            disabled={!roomId}
          >
            الـدخـول للــغرفة
          </button>
        </div>
      </div>
    </div>
  );
}

export default Debate_screen;