import React from 'react';
import './index.css'

export const Head = ({ text, sortData, sortedColumn }) => {

    let styleOfSorted ={}
    if (sortedColumn.column === text) {
        styleOfSorted = {opacity: '100%'}
        if (sortedColumn.sortedBy === 'asc') {
            styleOfSorted = {...styleOfSorted, transform: 'rotate(180deg)'}
        }
    }
    

    return (
        <th>
            <span className='table_head' onClick={() => sortData(text)}>
                {text.toUpperCase()}
                <span className="material-icons table_head_icon" style={styleOfSorted}>
                    arrow_upward
                </span>
            </span>

        </th>
    )
}