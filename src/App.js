import React, { useState } from 'react';
import './App.css';
import { SelectData } from './components/SelectData/SelectData';
import { Table } from './components/Table/Table';



function App() {

  const [type, setType] = useState(null)

  const dataHandler = type => {
    setType(type)
  }

  return (
    <div className="app">
      <SelectData
        onChangeHandler={dataHandler}
      />
      {
        type ? <Table type={type}/> : null
      }    
    </div>
  );
}

export default App;
