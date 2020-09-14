import React from 'react';
import { Head } from './Head/Head';
import { Row } from './Row/Row';

export const Table = ({data}) => {

    if (data[0]) {
        console.log("Table -> data", Object.keys(data[0]))
    }

    const headers = Object.keys(data[0]).map(item => <Head text={item} />)
    const rows = data.map(row => <Row rowData={row}/>) 
    
    console.log("Table -> rows", rows)
    return (
        <table class="uk-table uk-table-small uk-table-divider">
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>
    )
}