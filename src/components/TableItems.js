import React from 'react'

const TableItems = (data) => {

    console.log(data);

    console.log(data.codigo)

    let body;

    if(data.table === 'proyecto'){
        body = <tbody>        
                     <tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.codigo_estado}</td>
                        <td>{data.fk ? "true": "false"}</td>
                    </tr>        
                    </tbody>
    }

    if(data.table !== 'proyecto'){
        body = <tbody>        
                     <tr key={data.codigo}>
                        <td>{data.codigo}</td>                        
                        <td>{data.descripcion}</td>                        
                    </tr>        
                    </tbody>
    }

  return (
   body
  )
}

export default TableItems
