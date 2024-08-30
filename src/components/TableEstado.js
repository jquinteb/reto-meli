import React, { useEffect, useState } from 'react'
import '../styles.css';
import { fetchTableData, fetchTables } from '../api/apiClient';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TableEstado = ({table}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [header, setheader] = useState([]);
  const [data, setData] = useState([]);
  const [newRecord, setNewRecord] = useState({});
  const [editedRecord, setEditedRecord] = useState(data);
  const [error, setError] = useState('');


  useEffect(() => {
    const getData = async () => {
      try {

        const { fields } = (await fetchTables(table)).data;
        setheader(fields);
        
        const { values } = (await fetchTableData(table)).data;
        setData(values);        

      } catch (error) {
        console.error('Error consultando los datos de la API:', error);
      }
    };

    table && getData();
    
  }, [table]);



  const handleSaveClick = () => {    
    try {      
      setData((prevData) =>
        prevData.map((item) =>
          item.codigo === editedRecord.codigo ? editedRecord : item
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error guardando registro:', error);
    }
  };



  const handleCreate = async () => {

    const isFormValid = header.every((item) => newRecord[item.name] && newRecord[item.name].trim() !== '');

    if (!isFormValid) {
      setError('Por favor, completa todos los campos antes de grabar.');
      return; 
    }

    try {
      setData((prevData) => [...prevData, newRecord]);      
      setNewRecord({});
      setError('');
    } catch (error) {
      console.error('Error creando el registro:', error);
    }
  };



  const handleUpdate = async (item) => {
    try {
      
        setIsModalOpen(true);
        setEditedRecord(item);
        
    } catch (error) {
      console.error('Error actualizando el registro:', error);
    }
  };



  const handleDelete = async (codigo) => {
    try {
        setData((prevData) => prevData.filter((item) =>  item.codigo !==codigo));
    } catch (error) {
      console.error('Error eliminando el registro:', error);
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

          {error && <p style={{ color: 'red' }}>{error}</p>}

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
              <tr key={item.codigo}>
              <td>{item.codigo}</td>
              <td>{item.descripcion}</td>
              <td>
                <button className="update" onClick={() => handleUpdate(item)}>
                  Actualizar
                </button>
                <button className="delete" onClick={() => handleDelete(item.codigo)}>
                  Eliminar
                </button>
              </td>
            </tr>
            ))}
          </tbody>

          <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <h2>Editar Registro</h2>

          <label>Código:</label>
          <input value={editedRecord.codigo} disabled />
            <br /> <br />
          <label>Descripción:</label>
          <input
            type="text"
            required
            value={editedRecord.descripcion}
            onChange={(e) => setEditedRecord({ ...editedRecord, descripcion: e.target.value })}
          />

          <br /><br />
          <button onClick={() => handleSaveClick()}>Guardar</button>
          <button onClick={() => setIsModalOpen(false)} className="delete">Cancelar</button>
        </Modal>

        </table>
      </div>
    </>
  );


}

export default TableEstado
