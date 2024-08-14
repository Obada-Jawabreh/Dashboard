import React from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Chat from "./Chat";
import { Route, BrowserRouter, Routes } from "react-router-dom";

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
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Dashboard;
