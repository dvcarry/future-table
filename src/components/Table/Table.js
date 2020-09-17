import React, { useEffect, useState } from 'react';
import { Head } from './Head/Head';
import { Pagination } from './Pagination/Pagination';
import { Row } from './Row/Row';
import { Search } from './Search/Search';
import { nanoid } from 'nanoid';
import { fetchData } from '../../data/api';
import { dataForTable } from '../../data/data';

export const Table = ({ type }) => {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortedColumn, setSortedColumn] = useState({ column: '', sortBy: '' })
    const [data, setData] = useState([])
    console.log("Table -> data", data)
    const [chosenUser, setChosenUser] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        // if (type) {
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
        // }
    }, [type])

    const chooseUserHandler = id => {
        setChosenUser(id)
    }

    const sortData = (column) => {
        let sortedBy = 'desc'
        if (column === sortedColumn.column) {
            sortedBy = sortedColumn.sortedBy === 'desc' ? 'asc' : 'desc'
        }
        setSortedColumn({ column, sortedBy })

        const newData = data.sort((a, b) => {

            let compare

            if (b[column] < a[column]) {
                compare = -1;
            } else if (b[column] > a[column]) {
                compare = 1;
            } else {
                compare = 0;
            }
            return sortedBy === 'asc' ? compare : -compare

        })
        // setData(newData)
    }

    const changePageHandler = (page, direction) => {
        const newPage = direction === 'plus' ? page + 1 : page - 1
        setPage(newPage)
    }

    const searchHandler = text => {
        console.log("Table -> text", text, data)
        const filtredData = data.filter(item => {
            return item.firstName.toLowerCase().includes(text.toLowerCase()) ||
                item.lastName.toLowerCase().includes(text.toLowerCase()) ||
                item.email.toLowerCase().includes(text.toLowerCase())
        })

        console.log("Table -> filtredData", filtredData)

    }

    // const dataForPage = data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    // const headers = data[0] && Object.keys(data[0]).map(item => {
    //     if (item !== 'uid') {
    //         return (
    //             <Head
    //                 text={item}
    //                 key={item}
    //                 sortData={sortData}
    //                 sortedColumn={sortedColumn}
    //             />
    //         )
    //     }
    // })

    const rows = data.map(row => (
        <Row
            rowData={row}
            key={row.uid}
            // chooseUser={chooseUser}
            chosenUser={chosenUser}
        />
    ))

    return (
        <>
            <Search searchText={searchHandler} />
            <table className="uk-table uk-table-small uk-table-divider uk-table-justify">
                <thead>
                    <tr>
                        {/* {headers} */}
                        {dataForTable.map(item => {
                            return (
                                <Head
                                    text={item}
                                    key={item}
                                    sortData={sortData}
                                    sortedColumn={sortedColumn}
                                />
                            )
                        })}
                    </tr>
                </thead>

                <tbody>                    
                    {rows}
                </tbody>
            </table>
            <Pagination
                page={page}
                rowsPerPage={rowsPerPage}
                datalength={data.length}
                changePage={changePageHandler}
            />
        </>
    )
}