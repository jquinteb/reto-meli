import React, { useState } from 'react';
import TableList from './components/TableList';
import TableCrud from './components/TableCrud';
import './styles.css'; 

import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';

import {Authenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(awsconfig);

const App = () => {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <Authenticator>
      {({ signOut, user }) => (        
        <>
        <button onClick={signOut} className="centered-button">Sign out</button>
        <TableList onTableSelect={setSelectedTable} />
            {selectedTable && <TableCrud table={selectedTable} />}                    
        </>        
        )}
        </Authenticator>
    );

};

export default App;
