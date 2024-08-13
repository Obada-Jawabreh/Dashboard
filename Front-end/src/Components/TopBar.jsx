import React from "react";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
      <div className="flex items-center">
        <img
          aria-hidden="true"
          alt="brand-logo"
          src="https://openui.fly.dev/openui/24x24.svg?text=😊"
          className="mr-2"
        />
        <span className="font-bold text-lg">BRAND</span>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-border rounded-lg p-2 mr-4"
        />
        <button className="bg-secondary text-secondary-foreground p-2 rounded-lg">
          <img
            aria-hidden="true"
            alt="search-icon"
            src="https://openui.fly.dev/openui/24x24.svg?text=🔍"
          />
        </button>
        <div className="relative">
          <button className="relative p-2">
            <img
              aria-hidden="true"
              alt="notifications-icon"
              src="https://openui.fly.dev/openui/24x24.svg?text=🔔"
            />
            <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full text-xs px-1">
              3+
            </span>
          </button>
          <button className="relative p-2">
            <img
              aria-hidden="true"
              alt="messages-icon"
              src="https://openui.fly.dev/openui/24x24.svg?text=✉️"
            />
            <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full text-xs px-1">
              7
            </span>
          </button>
        </div>
        <div className="ml-4 flex items-center">
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
