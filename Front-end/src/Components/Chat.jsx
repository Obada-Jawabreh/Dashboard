import React from "react";

const Chat = () => {
  return (
    <div className="flex h-screen bg-gray-100 flex-row-reverse">
      {/* الشريط الجانبي */}
      <div className="w-1/3 border-r border-gray-300 p-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="بحث"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button className="bg-green-500 text-white rounded-full p-2 ml-2">
            +
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-2">المحادثات</h2>
        <div className="space-y-2">
          {/* قائمة المحادثات */}
          <div className="p-2 bg-gray-200 rounded-lg">
            <span className="font-semibold">أحمد العلي</span>
            <span className="text-gray-500 block text-sm">
              متى ستعقد الانتخابات القادمة؟
            </span>
          </div>
          <div className="p-2 bg-gray-200 rounded-lg">
            <span className="font-semibold">سارة محمود</span>
            <span className="text-gray-500 block text-sm">
              أرسلت لك الوثائق المطلوبة.
            </span>
          </div>
          <div className="p-2 bg-gray-200 rounded-lg">
            <span className="font-semibold">محمد حسين</span>
            <span className="text-gray-500 block text-sm">
              كيف يمكنني التسجيل للانتخابات؟
            </span>
          </div>
          <div className="p-2 bg-gray-200 rounded-lg">
            <span className="font-semibold">ليلى خالد</span>
            <span className="text-gray-500 block text-sm">
              شكراً على المساعدة!
            </span>
          </div>
        </div>
      </div>

      {/* محتوى الدردشة */}
      <div className="flex-1 p-4">
        {/* معلومات المستخدم */}
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="text-xl font-semibold">اسم المستخدم</span>
        </div>

        <div className="space-y-4">
          {/* رسائل الدردشة */}
          <div className="text-right">
            <div className="bg-gray-500 text-white p-2 rounded-lg">
              <span>مرحباً! أود الاستفسار عن موعد الانتخابات.</span>
            </div>
            <span className="text-gray-300 block text-sm">12:21 ص</span>
          </div>
          <div className="text-left">
            <div className="bg-gray-200 p-2 rounded-lg">
              <span>الانتخابات ستعقد في نهاية الشهر القادم.</span>
            </div>
            <span className="text-gray-500 block text-sm">12:22 ص</span>
          </div>
          <div className="text-right">
            <div className="bg-gray-300 text-white p-2 rounded-lg">
              <span>شكراً على المعلومات.</span>
            </div>
            <span className="text-gray-500 block text-sm">12:23 ص</span>
          </div>
        </div>

        {/* إدخال الرسالة */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="اكتب رسالة هنا..."
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button className="bg-gray-300 text-white rounded-full p-2 mt-2">
            إرسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
