import React, { useState } from "react";
import { Link } from "react-router-dom";

// مكون Sidebar الرئيسي
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navbarHeight = "64px"; // افتراض ارتفاع شريط التنقل العلوي

  return (
    <>
      <div 
        className={`fixed top-[${navbarHeight}] right-0 h-[calc(100vh-${navbarHeight})] bg-white text-gray-800 p-4 ${
          isExpanded ? 'w-64' : 'w-20'
        } transition-all duration-300 ease-in-out overflow-hidden shadow-lg z-40`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <nav className="flex flex-col h-full justify-between">
          <div>
            {/* روابط التنقل */}
            <SidebarLink to="/" icon="👜" text="نظرة عامة" isExpanded={isExpanded} />
            <SidebarLink to="/Request" icon="📰" text="طلبات الترشيح" isExpanded={isExpanded} />
            <SidebarLink to="/VoteTable" icon="📊" text="النتائج الأولية للقائمة المحلية" isExpanded={isExpanded} />
            <SidebarLink to="/PartyTable" icon="📊" text="النتائج الأولية للقائمة الحزبية" isExpanded={isExpanded} />
            <SidebarLink to="/chat" icon="👥" text="المحادثات" isExpanded={isExpanded} />
            <SidebarLink to="/ElectionCalendar" icon="📅" text="التقويم الانتخابي" isExpanded={isExpanded} />
          </div>
          
          {/* مكون Footer */}
          <Footer isExpanded={isExpanded} />
        </nav>
      </div>
      {/* مساحة فارغة لمنع تداخل المحتوى */}
      <div className="w-20 h-screen"></div>
    </>
  );
};

// مكون SidebarLink للروابط الفردية
const SidebarLink = ({ to, icon, text, isExpanded }) => {
  return (
    <Link to={to} className={`flex items-center py-3 px-4 text-gray-700 hover:bg-blue-100 rounded transition-colors duration-200 ${
      isExpanded ? 'flex-row-reverse' : 'justify-center'
    }`}>
      <span className={`text-xl ${isExpanded ? 'ml-3' : ''}`}>{icon}</span>
      {isExpanded && <span className="transition-opacity duration-300">{text}</span>}
    </Link>
  );
};

// مكون Footer
const Footer = ({ isExpanded }) => {
  return (
    <div className="mt-auto">
      <SidebarLink to="/settings" icon="⚙️" text="الإعدادات" isExpanded={isExpanded} />
      <button 
        className={`w-full flex items-center py-3 px-4 text-gray-700 hover:bg-blue-100 rounded transition-colors duration-200 ${
          isExpanded ? 'flex-row-reverse' : 'justify-center'
        }`}
        onClick={() => console.log("تسجيل الخروج")} // استبدل هذا بوظيفة تسجيل الخروج الفعلية
      >
        <span className={`text-xl ${isExpanded ? 'ml-3' : ''}`}>🚪</span>
        {isExpanded && <span className="transition-opacity duration-300">تسجيل الخروج</span>}
      </button>
    </div>
  );
};

export default Sidebar;