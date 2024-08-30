import React, { useEffect, useState } from 'react'
import '../styles.css';
import { fetchTableData, fetchTables } from '../api/apiClient';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TableProyecto = ({table}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [header, setheader] = useState([]);
  const [data, setData] = useState([]);
  const [newRecord, setNewRecord] = useState({});
  const [editedRecord, setEditedRecord] = useState(data);



  useEffect(() => {
    const getData = async () => {
      try {

        const { fields } = (await fetchTables(table)).data;
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

  const handleSaveClick = () => {    
    try {      
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editedRecord.id ? editedRecord : item
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };



  const handleCreate = async () => {

    try {
      setData((prevData) => [...prevData, newRecord]);      
      setNewRecord({});

    } catch (error) {
      console.error('Error creating record:', error);
    }
  };



  const handleUpdate = async (item) => {
    try {
      console.log(item);

        setIsModalOpen(true);
        setEditedRecord(item);
        
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };



  const handleDelete = async (id) => {
    try {
        setData((prevData) => prevData.filter((item) =>  item.id !==id));
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
            <input
              key={item.name}
              type="text"
              placeholder={item.name}
              onChange={(e) => setNewRecord({ ...newRecord, [item.name]: e.target.value })}
            />
          ))}

          <br /> <br />

          <button onClick={handleCreate}>Grabar</button>
        </div>

        <table className="styled-table">
          <thead>
            <tr>
              {header.map((item) => (
                <th key={item.name}>{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.codigo_estado}</td>
              <td>{item.fk ? 'true' : 'false'}</td>
              <td>
                <button className="update" onClick={() => handleUpdate(item)}>
                  Actualizar
                </button>
                <button className="delete" onClick={() => handleDelete(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
            ))}
          </tbody>

          <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <h2>Editar Proyecto</h2>

            <label>ID:</label>
            <input value={editedRecord.id} disabled />
            
            <br /><br />

            <label>Nombre:</label>
            <input
              type="text"
              value={editedRecord.name}
              onChange={(e) => setEditedRecord({ ...editedRecord, name: e.target.value })}
            />

            <br /><br />

            <label>Estado:</label>
            <input
              type="text"
              value={editedRecord.codigo_estado}
              onChange={(e) => setEditedRecord({ ...editedRecord, codigo_estado: e.target.value })}
            />

            <br /><br />

            <label>FK:</label>
            <input
              type="text"
              value={editedRecord.fk ? 'true' : 'false'}
              onChange={(e) => setEditedRecord({ ...editedRecord, fk: e.target.value === 'true' })}
            />

            <br /><br />
            <button onClick={handleSaveClick} className="delete">Guardar</button>
            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
        </Modal>

        </table>
      </div>
    </>
  );


}

export default TableProyecto
