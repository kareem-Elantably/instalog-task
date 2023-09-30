// pages/logging.tsx

import React, { useState } from "react";

const Logging: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const logData = [
    { actor: "User A", action: "Logged in", date: "2023-09-28 10:00 AM" },
    {
      actor: "User B",
      action: "Searched for items",
      date: "2023-09-28 11:30 AM",
    },
    // Add more log entries as needed
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const filteredLogs = logData.filter((log) => {
    return (
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Logging System</h1>
      <div className="w-80 mb-4">
        <input
          type="text"
          placeholder="Search by Actor, Action, or Date"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <table className="w-80 border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-200 p-2">Actor</th>
            <th className="bg-gray-200 p-2">Action</th>
            <th className="bg-gray-200 p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index}>
              <td className="border p-2">{log.actor}</td>
              <td className="border p-2">{log.action}</td>
              <td className="border p-2">{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logging;
