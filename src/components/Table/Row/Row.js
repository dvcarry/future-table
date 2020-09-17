import React from 'react';
import './index.css'
import { dataForTable } from '../../../data/data';

export const Row = ({ rowData, chooseUser, chosenUser }) => {

    // const cellsWithoutUniq = Object.entries(rowData).filter(item => {
    //     if (item[0] !== 'uid') {
    //         return item[1]
    //     }
    // }).map((text, i) => <Cell key={i} text={text[1]} />)

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
                        >{rowData[item]}</td>
                    )
                })
            }
        </tr>
    )
}