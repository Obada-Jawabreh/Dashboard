import React from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Chat from "./Chat";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Request from "./Request ";
import ElectionCalendar from "./ElectionCalendar";
import Debate_screen from "./GenarateCode";
const Dashboard = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <TopBar />
        <div className="flex flex-row-reverse">
          <Sidebar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/Request" element={<Request />} />
              <Route path="/ElectionCalendar" element={<ElectionCalendar />} />
              <Route path="/Debate_screen" element={<Debate_screen />} />


            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Dashboard;
