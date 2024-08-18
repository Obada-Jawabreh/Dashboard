import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Request = () => {
  const [lists, setLists] = useState([]);
  const [selectedListType, setSelectedListType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    // محاكاة جلب البيانات من الخادم
    const fetchedLists = [
      { id: 1, name: 'قائمة أ', type: 'محلية', status: 'مرشحة', candidates: ['مرشح 1', 'مرشح 2', 'مرشح 3'] },
      { id: 2, name: 'قائمة ب', type: 'حزبية', status: 'غير مرشحة', candidates: ['مرشح 4', 'مرشح 5', 'مرشح 6'] },
      { id: 3, name: 'قائمة ج', type: 'محلية', status: 'مرشحة', candidates: ['مرشح 7', 'مرشح 8', 'مرشح 9'] },
      { id: 4, name: 'قائمة د', type: 'حزبية', status: 'مرشحة', candidates: ['مرشح 10', 'مرشح 11', 'مرشح 12'] },
    ];
    setLists(fetchedLists);
  }, []);

  const handleShowList = (list) => {
    Swal.fire({
      title: list.name,
      html: `
        <h3>المرشحون:</h3>
        <ul>
          ${list.candidates.map(candidate => `<li>${candidate}</li>`).join('')}
        </ul>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'قبول',
      cancelButtonText: 'رفض'
    }).then((result) => {
      if (result.isConfirmed) {
        handleAcceptReject(list, 'accept');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        handleAcceptReject(list, 'reject');
      }
    });
  };

  const handleAcceptReject = (list, action) => {
    Swal.fire({
      title: `هل أنت متأكد من ${action === 'accept' ? 'قبول' : 'رفض'} هذه القائمة؟`,
      text: `${list.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'accept' ? '#3085d6' : '#d33',
      cancelButtonColor: '#d33',
      confirmButtonText: action === 'accept' ? 'نعم، اقبلها' : 'نعم، ارفضها',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        // هنا يمكنك إضافة المنطق لمعالجة القبول أو الرفض
        Swal.fire(
          'تم!',
          `تم ${action === 'accept' ? 'قبول' : 'رفض'} القائمة بنجاح.`,
          'success'
        );
      }
    });
  };

  const filteredLists = lists.filter(list => 
    (selectedListType === 'all' || list.type === selectedListType) &&
    (selectedStatus === 'all' || list.status === selectedStatus)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">لوحة إدارة الانتخابات</h1>
      <div className="mb-4 flex space-x-4">
        <select 
          value={selectedListType} 
          onChange={(e) => setSelectedListType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">كل القوائم</option>
          <option value="محلية">القوائم المحلية</option>
          <option value="حزبية">القوائم الحزبية</option>
        </select>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">كل الحالات</option>
          <option value="مرشحة">مرشحة</option>
          <option value="غير مرشحة">غير مرشحة</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLists.map((list) => (
          <div key={list.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{list.name}</h2>
            <p className="mb-2">النوع: {list.type}</p>
            <p className="mb-2">الحالة: {list.status}</p>
            <button
              onClick={() => handleShowList(list)}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              عرض القائمة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;