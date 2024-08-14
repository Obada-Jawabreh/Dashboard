import React from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Home from "./Home";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="flex flex-row-reverse">
        <Sidebar />
        <Home />
      </div>
    </div>
  );
};

export default Dashboard;
