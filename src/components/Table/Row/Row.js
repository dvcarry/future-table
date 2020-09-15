import React from 'react';
import './index.css'
import { Cell } from '../Cell/Cell';

export const Row = ({ rowData, chooseUser, chosenUser }) => {

    const cells = !!rowData && Object.values(rowData).map(cell => {    
        if (cell instanceof Object) {
            return <Cell text={Object.values(cell).join(' ')} />
        } else {
            return <Cell text={cell} />
        }        
    })

    let classes = ['row']
    if (rowData.id === chosenUser) {
        classes.push('chosen')
    }

    return (
        <tr className={classes.join(' ')} onClick={() => chooseUser(rowData.id)}>
            {cells}
        </tr>
    )
}