import React from 'react';
import { Cell } from '../Cell/Cell';

export const Row = ({ rowData }) => {

    const cells = !!rowData && Object.values(rowData).map(cell => {    
        if (cell instanceof Object) {
            return <Cell text={Object.values(cell).join(' ')} />
        } else {
            return <Cell text={cell} />
        }        
    })

    return (
        <tr>
            {cells}
        </tr>
    )
}