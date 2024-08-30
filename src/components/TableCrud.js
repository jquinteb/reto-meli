import React from 'react';
import '../styles.css';
import TableEstado from './TableEstado';
import TableParametro from './TableParametro';
import TableProyecto from './TableProyecto';

const TableCrud = ({ table }) => {

  switch (table) {
    
    case 'estado':
      
      return <TableEstado table={table}/>

    case 'parametro':

      return <TableParametro table={table}/>

      case 'proyecto':

      return <TableProyecto table={table}/>
    
      default:

      return <div>No se encontró la tabla especificada.</div>;    
  }

};

export default TableCrud;


