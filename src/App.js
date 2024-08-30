import React, { useState } from 'react';
import TableList from './components/TableList';
import TableCrud from './components/TableCrud';
import './styles.css'; 


import {Authenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'


const App = () => {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <Authenticator>    
        <div>          
          <h1>CRUD Application</h1>
          <div className="container">
            <TableList onTableSelect={setSelectedTable} />
            {selectedTable && <TableCrud table={selectedTable} />}

            {({ signOut, user }) => (
              <main>
                <h1>Hello, {user.username}</h1>
                <button onClick={signOut}>Sign out</button>
              </main>
            )}

          </div>
        </div>        
        </Authenticator>
    );

};

export default App;
