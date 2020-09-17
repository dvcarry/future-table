import React, { useEffect, useState } from 'react';
import './App.css';
import { Board } from './components/Board/Board';
import { Input } from './components/Input/Input';
import { Table } from './components/Table/Table';
import { fetchData } from './data/api';
import { nanoid } from 'nanoid';
import { Spinner } from './components/Spinner/Spinner';


function App() {

  const [type, setType] = useState(null)
  console.log("App -> type", type)
  const [data, setData] = useState(null)
  const [chosenUser, setChosenUser] = useState(null)
  const [loading, setLoading] = useState(false)
  console.log("App -> loading", loading)
  console.log("App -> chosenUser", chosenUser)

  const dataHandler = type => {
    setType(type)
  }

  useEffect(() => {
    if (type) {
      setLoading(true)
      setChosenUser(null)
      const fetchDataByType = async () => {
        const newData = await fetchData(type)
        console.log("fetchDataByType -> newData", newData)
        const dataWithId = newData.map(item => {
          return {
            uid: nanoid(),
            ...item
          }
        })
        setData(dataWithId)
        setLoading(false)
      }
      fetchDataByType()
    }
  }, [type])

  const chooseUserHandler = id => {
    setChosenUser(id)
  }

  // const dataForPage = data && data.slice(page * rowsPerPage, rowsPerPage)
  // console.log("App -> dataForPage", dataForPage)

  const dataForTable = data && data.map(({ address, description, ...rest }) => ({ ...rest }))

  return (
    <div className="app">
        <Input onChangeHandler={dataHandler} />
      {
        loading
          ? <Spinner />
          : data
            ? <Table
              data={dataForTable}
              chooseUser={chooseUserHandler}
              chosenUser={chosenUser}
            // sortData={sortData} 
            // sortedColumn={sortedColumn}        
            />
            : null
      }
      {
        chosenUser ? <Board user={data.filter(item => item.uid === chosenUser)[0]} /> : null
      }

    </div>
  );
}

export default App;
