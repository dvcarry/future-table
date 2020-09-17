import React, { useState } from 'react';
import './index.css'

export const Search = ({ searchText }) => {

    const [text, setText] = useState('')

    const textHandler = event => {
        setText(event.target.value)
    }

    const searchHandler = () => {
        searchText(text)
    }


    return (
        <div className='search'>
            <input
                className="uk-input"
                value={text}
                type="text"
                placeholder="Input"
                onChange={textHandler}
            />
            <button
                className="uk-button uk-button-primary"
                onClick={searchHandler}
            >Найти</button>
        </div>

    )
}