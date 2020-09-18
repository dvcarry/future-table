import React, { useEffect, useMemo, useState } from 'react';
import { Head } from './Head/Head';
import { Pagination } from './Pagination/Pagination';
import { Row } from './Row/Row';
import { Search } from './Search/Search';
import { nanoid } from 'nanoid';
import { fetchData } from '../../data/api';
import { dataForTable, dataDesc } from '../../data/data';
import { Board } from '../Board/Board';
import { Spinner } from '../Spinner/Spinner';
import './Table.css'
import { Modal } from './Modal/Modal';
import { Button } from '../Button/Button';
import { createObjFromData } from '../../data/helpers';

export const Table = ({ type }) => {

    const [data, setData] = useState([])
    console.log("Table -> data", data)
    const [page, setPage] = useState(0)
    const [length, setLength] = useState(0)
    const [sortedColumn, setSortedColumn] = useState({ column: '', sortBy: '' })
    const [chosenUser, setChosenUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState(null)
    const [modal, setModal] = useState(false)
    console.log("Table -> modal", modal)

    const ROWS_PER_PAGE = 50


    useEffect(() => {
        setLoading(true)
        setLength(0)
        setSearchText(null)
        setSortedColumn({ column: '', sortBy: '' })
        setChosenUser(null)
        const fetchDataByType = async () => {
            const newData = await fetchData(type)
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
    }, [type])

    const sortColumnHandler = column => {
        let sortedBy = 'desc'
        if (sortedColumn.column === column) {
            sortedBy = sortedColumn.sortedBy === 'desc' ? 'asc' : 'desc'
        }
        setSortedColumn({ column, sortedBy })
    }

    const changePageHandler = (page, direction) => {
        const newPage = direction === 'plus' ? page + 1 : page - 1
        setPage(newPage)
    }

    const addDataHandler = newData => {
        const newRow = createObjFromData(newData, dataDesc)
        const newRowWithUid = {
            uid: nanoid(),
            ...newRow
        }
        setData([newRowWithUid, ...data])
        setModal(false)
    }

    const dataForRender = useMemo(() => {

        let calcData = data

        if (searchText) {
            calcData = calcData.filter(item => {
                return item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.email.toLowerCase().includes(searchText.toLowerCase())
            })
        }
        if (sortedColumn.column) {
            const column = sortedColumn.column
            const direction = sortedColumn.sortedBy === 'asc' ? 1 : -1

            calcData = calcData.sort((a, b) => {
                let compare
                if (b[column] < a[column]) {
                    compare = -1;
                } else if (b[column] > a[column]) {
                    compare = 1;
                } else {
                    compare = 0;
                }
                return compare * direction
            })
        }
        setLength(calcData.length)
        return calcData.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)

    }, [data, searchText, page, sortedColumn])

    const rows = dataForRender.map(row => (
        <Row
            rowData={row}
            key={row.uid}
            chooseUser={setChosenUser}
            chosenUser={chosenUser}
        />
    ))

    const headers = dataForTable.map(item => {
        return (
            <Head
                text={item}
                key={item}
                sortData={sortColumnHandler}
                sortedColumn={sortedColumn}
            />
        )
    })

    return (
        <>
            {
                loading
                    ? <Spinner />
                    : <>
                        <div className='tools'>
                            <Search
                                searchText={setSearchText}
                            />
                            <Button
                                text='Добавить'
                                customClass='primary'
                                callback={() => setModal(true)}
                            />
                        </div>

                        {
                            modal ? <Modal showModal={setModal} addData={addDataHandler} /> : null
                        }

                        <table className="Table">
                            <thead>
                                <tr>
                                    {headers}
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                        <Pagination
                            page={page}
                            rowsPerPage={ROWS_PER_PAGE}
                            datalength={length}
                            changePage={changePageHandler}
                        />
                        {
                            chosenUser ? <Board user={data.filter(item => item.uid === chosenUser)[0]} /> : null
                        }
                    </>
            }
        </>
    )
}