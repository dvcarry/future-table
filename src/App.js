import React, { useEffect, useState } from 'react';
import './App.css';
import { Board } from './components/Board/Board';
import { SelectData } from './components/SelectData/SelectData';
import { Table } from './components/Table/Table';
import { fetchData } from './data/api';

import { Spinner } from './components/Spinner/Spinner';


function App() {

  const [type, setType] = useState(null)
  console.log("App -> type", type)
  const [data, setData] = useState([])
  const [chosenUser, setChosenUser] = useState(null)
  const [loading, setLoading] = useState(false)


  const dataHandler = type => {
    setType(type)
  }

  // useEffect(() => {
  //   if (type) {
  //     setLoading(true)
  //     setChosenUser(null)
  //     const fetchDataByType = async () => {
  //       const newData = await fetchData(type)
  //       const dataWithId = newData.map(item => {
  //         return {
  //           uid: nanoid(),
  //           ...item
  //         }
  //       })
  //       setData(dataWithId)
  //       setLoading(false)
  //     }
  //     fetchDataByType()
  //   }
  // }, [type])

  const chooseUserHandler = id => {
    setChosenUser(id)
  }

  // const dataForPage = data && data.slice(page * rowsPerPage, rowsPerPage)

  // const dataForTable = data && data.map(({ address, description, ...rest }) => ({ ...rest }))

  return (
    <div className="app">

      <SelectData
        onChangeHandler={dataHandler}
      />
      {
        type ? <Table type={type}/> : null
      }    

{
        chosenUser ? <Board user={data.filter(item => item.uid === chosenUser)[0]} /> : null
      }

    </div>
  );
}

export default App;
