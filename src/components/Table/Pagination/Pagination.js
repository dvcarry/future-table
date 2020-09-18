import React from 'react';
import './Pagination.css'

export const Pagination = ({ page, rowsPerPage, datalength, changePage }) => {

    return (
        <div className='pagination'>
            {`${page * rowsPerPage + 1}-${(page + 1) * rowsPerPage > datalength ? datalength : (page + 1) * rowsPerPage} из ${datalength}`}
            <button
                onClick={() => changePage(page, 'minus')}
                disabled={page === 0}
            >
                <span className="material-icons">
                    keyboard_arrow_left
            </span>
            </button>
            <button
                onClick={() => changePage(page, 'plus')}
                disabled={page === Math.floor(datalength / rowsPerPage)}
            >
                <span className="material-icons">
                    keyboard_arrow_right
            </span>
            </button>
        </div>
    )
}