import React from 'react';
import './Head.css'

export const Head = ({ text, sortData, sortedColumn }) => {

    let styleOfSorted ={}
    if (sortedColumn.column === text) {
        styleOfSorted = {opacity: '100%'}
        if (sortedColumn.sortedBy === 'asc') {
            styleOfSorted = {...styleOfSorted, transform: 'rotate(180deg)'}
        }
    }
    

    return (
        <th
            className='table_head'
        >
            <span className='table_head_cell' onClick={() => sortData(text)}>
                {text.toUpperCase()}
                <span className="material-icons table_head_icon" style={styleOfSorted}>
                    arrow_upward
                </span>
            </span>

        </th>
    )
}