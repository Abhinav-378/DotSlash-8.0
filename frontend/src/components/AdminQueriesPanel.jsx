import React, { useState, useEffect } from 'react';

function AdminQueriesPanel() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusOptions = [
    "Proposed",
    "Ongoing",
    "Blocked",
    "Approved",
    "Rejected"
  ];

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await fetch('https://dotslash-8-0-1.onrender.com/all-complaints');
      const data = await response.json();
      setQueries(data.policies_arr);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching queries:', error);
      setLoading(false);
    }
  };

  const handleUpdate = async (reference_number, status, reason) => {
    try {
      const response = await fetch('https://dotslash-8-0-1.onrender.com/update-policy', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ reference_number, status, reason })
      });

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }

      fetchQueries();
      alert('Policy updated successfully!');
    } catch (error) {
      console.error("Update error details:", error);
      alert('Failed to update policy: ' + error.message);
    }
  };

  const QueryBlock = ({ query }) => {
    const [status, setStatus] = useState(query.status || 'Proposed');
    const [reason, setReason] = useState(query.reason || '');

    const handleSubmit = () => {
      handleUpdate(query.reference_number, status, reason);
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-200">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-gray-700">Name</h3>
            <p>{query.name}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Issue Area</h3>
            <p>{query.issue_area}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">State</h3>
            <p>{query.state_name}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Address</h3>
            <p>{query.address}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Query Description</h3>
          <p className="text-gray-600">{query.summary}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Reason/Message
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-100px bg-[#fd9644] text-white py-2 px-4 rounded-md hover:bg-orange-400 transition-colors"
        >
          Update Query
        </button>
      </div>
    );
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Admin Query Management</h1>
      {queries.map((query) => (
        <QueryBlock key={query.reference_number} query={query} />
      ))}
    </div>
  );
}

export default AdminQueriesPanel;
