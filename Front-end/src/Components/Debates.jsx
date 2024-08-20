import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Debate = () => {
  const [debates, setDebates] = useState([]);
  const [debateCode, setDebateCode] = useState('');
  const [status, setStatus] = useState({});

  // Fetch debates data from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/debate/debates')
      .then(response => {
        setDebates(response.data);
      })
      .catch(error => console.error('Error fetching debates:', error));
  }, []);

  const handleApprove = (id, e) => {
    e.preventDefault();
    if (debateCode === '') {
      alert('Please enter the debate code to approve.');
      return;
    }
    axios.post(`http://localhost:5000/api/debate/debates/${id}/approve`, { code: debateCode })
      .then(() => {
        setDebates(debates.map(debate =>
          debate.id === id ? { ...debate, isApproved: true, code: debateCode } : debate
        ));
        setStatus((prevStatus) => ({ ...prevStatus, [id]: 'Approved' }));
      })
      .catch(error => console.error('Error approving debate:', error));
  };

  const handleReject = (id) => {
    axios.post(`http://localhost:5000/api/debate/debates/${id}/reject`)
      .then(() => {
        setDebates(debates.filter(debate => debate.id !== id));
        setStatus((prevStatus) => ({ ...prevStatus, [id]: 'Rejected' }));
      })
      .catch(error => console.error('Error rejecting debate:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">طلبات المناظرة المرسلة</h1>
      <div className="max-w-3xl mx-auto space-y-4">
        {debates.map((debate) => (
          <div key={debate.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{debate.name}</div>
              <p className="text-gray-700 text-base mb-2">
                {debate.candidate1_name} VS {debate.candidate2_name}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Start Time: {new Date(debate.start_time).toLocaleString()}<br />
                End Time: {new Date(debate.end_time).toLocaleString()}<br />
                Code: {debate.code}
              </p>
              <form onSubmit={(e) => handleApprove(debate.id, e)}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`debateCode-${debate.id}`}>
                  Enter Debate Code:
                </label>
                <input
                  type="text"
                  id={`debateCode-${debate.id}`}
                  value={debateCode}
                  onChange={(e) => setDebateCode(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                <div className="mt-4 flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(debate.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reject
                  </button>
                </div>
              </form>
              {status[debate.id] && <p className="mt-4 text-lg font-bold text-gray-700">Status: {status[debate.id]}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Debate;
