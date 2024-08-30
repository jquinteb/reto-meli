import React, { useEffect, useState } from 'react';
import '../styles.css';

const TableList = ({ onTableSelect }) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {

    const predefinedTables = ['estado', 'proyecto', 'parametro'];

    setTables(predefinedTables);

  }, []);

 

  return (
    <div className="sidebar">
      <h2>Tables</h2>
      <ul>
        {tables.map((table) => (
          <li key={table} onClick={() => onTableSelect(table)}>
            {table}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;