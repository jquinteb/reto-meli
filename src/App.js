import React, { useState } from 'react';
import TableList from './components/TableList';
import TableCrud from './components/TableCrud';
import './styles.css';  // Importa el archivo de estilos consolidado

const App = () => {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <div>
      <h1>CRUD Application</h1>
      <div className="container">
        <TableList onTableSelect={setSelectedTable} />
        {selectedTable && <TableCrud table={selectedTable} />}
      </div>
    </div>
  );
};

export default App;
