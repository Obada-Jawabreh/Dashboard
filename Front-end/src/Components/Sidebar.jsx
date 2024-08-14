import React from "react";

const Sidebar = () => {
  return (
    <div
      className="group flex flex-col items-end bg-background p-4 rounded-lg shadow-lg w-20 hover:w-64 transition-all duration-300"
      style={{ direction: "rtl" }}
    >
      <button className="group-hover:flex items-center w-full mb-4">
        <img
          aria-hidden="true"
          alt="icon"
          className="ml-3"
          src="https://openui.fly.dev/openui/24x24.svg?text=👜"
        />
        <span className="text-primary-foreground group-hover:inline-block hidden text-right">
          نظرة عامة
        </span>
      </button>
      <button className="group-hover:flex items-center w-full mb-4 text-muted-foreground">
        <img
          aria-hidden="true"
          alt="icon"
          className="ml-3"
          src="https://openui.fly.dev/openui/24x24.svg?text=📊"
        />
        <span className="group-hover:inline-block hidden text-right">
          التحليلات
        </span>
      </button>
      <button className="group-hover:flex items-center w-full mb-4 text-muted-foreground">
        <img
          aria-hidden="true"
          alt="icon"
          className="ml-3"
          src="https://openui.fly.dev/openui/24x24.svg?text=👥"
        />
        <span className="group-hover:inline-block hidden text-right">
          المستخدمون
        </span>
      </button>
      <button className="group-hover:flex items-center w-full mb-4 text-muted-foreground">
        <img
          aria-hidden="true"
          alt="icon"
          className="ml-3"
          src="https://openui.fly.dev/openui/24x24.svg?text=📅"
        />
        <span className="group-hover:inline-block hidden text-right">
          التقويم
        </span>
      </button>
      <button className="group-hover:flex items-center w-full mb-4 text-muted-foreground">
        <img
          aria-hidden="true"
          alt="icon"
          className="ml-3"
          src="https://openui.fly.dev/openui/24x24.svg?text=⚙️"
        />
        <span className="group-hover:inline-block hidden text-right">
          الإعدادات
        </span>
      </button>
      <button className="group-hover:flex items-center w-full text-muted-foreground">
        <img
          aria-hidden="true"
          alt="icon"
          className="ml-3"
          src="https://openui.fly.dev/openui/24x24.svg?text=❓"
        />
        <span className="group-hover:inline-block hidden text-right">
          المساعدة
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
