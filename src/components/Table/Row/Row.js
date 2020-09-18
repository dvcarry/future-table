import React from 'react';
import './Row.css'
import { dataForTable } from '../../../data/data';

export const Row = ({ rowData, chooseUser, chosenUser }) => {

    let classes = ['row']
    if (rowData.uid === chosenUser) {
        classes.push('chosen')
    }

    return (
        <tr className={classes.join(' ')} onClick={() => chooseUser(rowData.uid)}>
            {
                dataForTable.map(item => {
                    return (
                        <td
                            key={rowData.uid + item}
                            className='row_cell'
                        >
                            {rowData[item]}
                        </td>
                    )
                })
            }
        </tr>
    )
}