import React, { useState, useEffect } from 'react';
import { fetchTableData, createRecord, updateRecord, deleteRecord, fetchTables } from '../api/apiClient';
import '../styles.css';


const TableCrud = ({ table }) => {
  const [header, setheader] = useState([]);
  const [data, setData] = useState([]);
  const [newRecord, setNewRecord] = useState({});

  useEffect(() => {

    const getData = async () => {

      try {

        const {fields} = (await fetchTables(table)).data;

        setheader(fields);
            
            const { values } = (await fetchTableData(table)).data;

            setData(values);
        
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    if (table) {
      getData();
    }
  }, [table]);

  const handleCreate = async () => {
    try {

        await createRecord(table, newRecord);

        setNewRecord({});

        const response = await fetchTableData(table);

        setData(response.data);

    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateRecord(table, id, newRecord);
      setNewRecord({});
      const response = await fetchTableData(table);
      setData(response.data);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecord(table, id);
      const response = await fetchTableData(table);
      setData(response.data);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <>
        <div className="main-content">        
            <h2>CRUD sobre {table}</h2>
            <div>
                <h3>Nuevo registro</h3>

                {header.map((item) => (
                    <input key={item.name} type="text" placeholder={item.name} onChange={(e) => setNewRecord({ ...newRecord, [item.name]: e.target.value })} />
                ))}
                
                <br/>

                <button onClick={handleCreate}>Grabar</button>

            </div>
        
            <table className="styled-table">
                <thead>
                    <tr>
                    {header.map((item) => (
                        <th key={item.name}>{item.name}</th>
                    ))}
                    <th>Acciones</th>
                    </tr>
                </thead>                
                <tbody>
                    { data.map((item) => (
                        <tr key={item.codigo}>
                        <td>{item.codigo}</td>
                        <td>{item.descripcion}</td>
                        <td><button className="update" onClick={() => handleUpdate(item.id)}> Actualizar </button>
                        <button className="delete" onClick={() => handleDelete(item.id)}> Eliminar </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  );
};

export default TableCrud;
