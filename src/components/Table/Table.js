import React, { useState } from 'react';
import { Head } from './Head/Head';
import { Pagination } from './Pagination/Pagination';
import { Row } from './Row/Row';

export const Table = ({ data, chooseUser, chosenUser }) => {
console.log("Table -> data", data)

    const [page, setPage] = useState(0)
    console.log("Table -> page", page)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortedColumn, setSortedColumn] = useState({ column: '', sortBy: '' })

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

    const dataForPage = data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    console.log("Table -> dataForPage", dataForPage)

    const headers = Object.keys(data[0]).map(item => <Head text={item} key={item} sortData={sortData} sortedColumn={sortedColumn} />)
    const rows = dataForPage.map(row => <Row rowData={row} key={row.id} chooseUser={chooseUser} chosenUser={chosenUser}/>)



    console.log("Table -> rows", rows)
    return (
        <>
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
        </>
    )
}