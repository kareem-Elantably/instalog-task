"use client"; // This is a client component 👈🏽

import React, { useState } from "react";

interface DataTableProps {
  data: any[]; // Replace with your data type
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // State to manage visible rows and search term
  const [visibleRows, setVisibleRows] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Function to load more rows
  const loadMore = () => {
    setVisibleRows((prevVisibleRows) => prevVisibleRows + 10);
  };

  // Function to handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filtering logic based on search term
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm); // Replace with your filtering logic
    });

    setFilteredData(filteredData);
  };

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {/* Rendering visible rows */}
          {filteredData.slice(0, visibleRows).map((item, index) => (
            <tr key={index}>
              <td>{item.column1}</td>
              <td>{item.column2}</td>
              {/* Render other columns */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Load more button */}
      {visibleRows < filteredData.length && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default DataTable;
