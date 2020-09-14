import React, { useState } from 'react';
import './App.css';
import { Input } from './components/Input/Input';
import { Table } from './components/Table/Table';
import { fetchData } from './data/api';

function App() {

  const [data, setData] = useState(null)
  console.log("App -> data", data)

  const dataHandler = async type => {
    const newData = await fetchData(type)
    setData(newData)
  }

  return (
    <div className="app">
      <Input onChangeHandler={dataHandler}/>
      {
        data ? <Table data={data}/> : null
      }
      
    </div>
  );
}

export default App;
