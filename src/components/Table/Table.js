import React, { useEffect, useMemo, useState } from 'react';
import { Head } from './Head/Head';
import { Pagination } from './Pagination/Pagination';
import { Row } from './Row/Row';
import { Search } from './Search/Search';
import { nanoid } from 'nanoid';
import { fetchData } from '../../data/api';
import { dataForTable } from '../../data/data';
import { Board } from '../Board/Board';
import { Spinner } from '../Spinner/Spinner';

export const Table = ({ type }) => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortedColumn, setSortedColumn] = useState({ column: '', sortBy: '' })
    const [chosenUser, setChosenUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState(null)


    useEffect(() => {
        setLoading(true)
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

            calcData = data.sort((a, b) => {
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

        return calcData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
                        <Search searchText={setSearchText} />
                        <table className="uk-table uk-table-small uk-table-divider uk-table-justify">
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
                            rowsPerPage={rowsPerPage}
                            datalength={data.length}
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