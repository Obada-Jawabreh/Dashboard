import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactUsDashboard = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState(10);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact/queries');
        setQueries(response.data);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchQueries();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQueries = queries.filter(query =>
    query.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendEmail = (email, subject, message) => {
    const encodedMessage = encodeURIComponent(message);
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodedMessage}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <div className="flex">
      <div className="p-6 bg-background rounded-lg shadow-md w-full ml-4">
        <h2 className="text-xl font-semibold mb-4">إدارة الاستفسارات عبر البريد الإلكتروني</h2>
        <div className="flex justify-between mb-4">
          <div>
            <label className="mr-2">عرض</label>
            <select 
              className="border border-border rounded p-1" 
              value={entries} 
              onChange={(e) => setEntries(Number(e.target.value))}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="ml-2">مدخلات</span>
          </div>
          <div>
            <input 
              type="text" 
              placeholder="بحث" 
              className="border border-border rounded p-1" 
              value={searchTerm} 
              onChange={handleSearch}
            />
          </div>
        </div>
        <table className="min-w-full bg-card border-collapse border-spacing-2">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="p-2 border border-border text-center">التاريخ</th>
              <th className="p-2 border border-border text-center">اسم المستخدم</th>
              <th className="p-2 border border-border text-center">البريد الإلكتروني</th>
              <th className="p-2 border border-border text-center">الموضوع</th>
              <th className="p-2 border border-border text-center">الرسالة</th>
              <th className="p-2 border border-border text-center">إرسال بريد</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueries.slice(0, entries).map((query, index) => (
              <tr key={index} className="border-b border-border">
                <td className="p-2 border border-border text-center">{query.created_at}</td>
                <td className="p-2 border border-border text-center">{query.name}</td>
                <td className="p-2 border border-border text-center">{query.email}</td>
                <td className="p-2 border border-border text-center">{query.subject}</td>
                <td className="p-2 border border-border text-center">{query.message}</td>
                <td className="p-2 border border-border text-center">
                  <button 
                    className="bg-primary text-primary-foreground rounded px-4 py-1"
                    onClick={() => handleSendEmail(query.email, query.subject, query.message)}
                  >
                    إرسال بريد
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <span className="text-muted-foreground">
            عرض {Math.min(entries, filteredQueries.length)} من {filteredQueries.length} مدخلات
          </span>
          <div>
            <button className="border border-border rounded px-2 py-1">السابق</button>
            <span className="mx-2">1</span>
            <button className="border border-border rounded px-2 py-1">التالي</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsDashboard;
