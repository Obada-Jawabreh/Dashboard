import React from "react";

const TopBar = () => {
  return (
    <div
      className="flex items-center justify-between p-4 bg-primary text-primary-foreground"
      style={{ direction: "rtl" }}
    >
      <div className="flex items-center">
        <img
          aria-hidden="true"
          alt="brand-logo"
          src="https://openui.fly.dev/openui/24x24.svg?text=😊"
          className="ml-2"
        />
        <span className="font-bold text-lg">BRAND</span>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="بحث..."
          className="border border-border rounded-lg p-2 ml-4"
        />
        <button className="bg-secondary text-secondary-foreground p-2 rounded-lg ml-2">
          <img
            aria-hidden="true"
            alt="search-icon"
            src="https://openui.fly.dev/openui/24x24.svg?text=🔍"
          />
        </button>
        <div className="relative ml-4">
          <button className="relative p-2 ml-2">
            <img
              aria-hidden="true"
              alt="notifications-icon"
              src="https://openui.fly.dev/openui/24x24.svg?text=🔔"
            />
            <span className="absolute top-0 left-0 bg-destructive text-destructive-foreground rounded-full text-xs px-1">
              3+
            </span>
          </button>
          <button className="relative p-2 ml-2">
            <img
              aria-hidden="true"
              alt="messages-icon"
              src="https://openui.fly.dev/openui/24x24.svg?text=✉️"
            />
            <span className="absolute top-0 left-0 bg-destructive text-destructive-foreground rounded-full text-xs px-1">
              7
            </span>
          </button>
        </div>
        <div className="flex items-center ml-4">
          <img
            aria-hidden="true"
            alt="user-avatar"
            src="https://openui.fly.dev/openui/24x24.svg?text=👤"
            className="rounded-full"
          />
          <span className="ml-2">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
