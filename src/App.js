import React, { useEffect, useState } from 'react';
import './App.css';
import { Board } from './components/Board/Board';
import { Input } from './components/Input/Input';
import { Table } from './components/Table/Table';
import { fetchData } from './data/api';

function App() {

  const [type, setType] = useState('')
  const [data, setData] = useState(null)
  const [chosenUser, setChosenUser] = useState(null)
  const [loading, setLoading] = useState(false)
  console.log("App -> chosenUser", chosenUser)

  const dataHandler = type => {
    setType(type)
  }

  useEffect(() => {
    const fetchDataByType = async () => {
      const newData = await fetchData(type)
      setData(newData)
    }
    fetchDataByType()
  }, [type])

  const chooseUserHandler = id => {
    setChosenUser(id)
  }

  // const dataForPage = data && data.slice(page * rowsPerPage, rowsPerPage)
  // console.log("App -> dataForPage", dataForPage)

  return (
    <div className="app">
      <Input onChangeHandler={dataHandler} />
      {
        data
          ? <Table
            data={data}
            chooseUser={chooseUserHandler}
            chosenUser={chosenUser}
          // sortData={sortData} 
          // sortedColumn={sortedColumn}        
          />
          : null
      }
      {
        chosenUser ? <Board user={data.filter(item => item.id === chosenUser)[0]} /> : null
      }

    </div>
  );
}

export default App;
