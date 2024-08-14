import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (

    <div className="group flex flex-col items-start bg-background p-4 rounded-lg shadow-lg w-20 hover:w-64 transition-all duration-300">
      <Link to="/">
        {" "}
        <button className="group-hover:flex items-center w-full mb-4">
          <img
            aria-hidden="true"
            alt="icon"
            className="mr-3"
            src="https://openui.fly.dev/openui/24x24.svg?text=👜"
          />
          <span className="text-primary-foreground group-hover:inline-block hidden">
            نظرة عامة
          </span>
        </button>
      </Link>

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
          className="mr-3"
          src="https://openui.fly.dev/openui/24x24.svg?text=📨"
        />
        <Link to="/chat">
          {" "}
          <span className="group-hover:inline-block hidden">المسجات</span>
        </Link>
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
