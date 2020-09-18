import React, { useState } from 'react';
import { Button } from '../../Button/Button';
import './Search.css'

export const Search = ({ searchText }) => {

    const [text, setText] = useState('')

    const textHandler = event => {
        setText(event.target.value)
    }

    const searchHandler = () => {
        searchText(text)
    }


    return (
        <div className='Search'>
            <input
                className="search_input"
                value={text}
                type="text"
                placeholder="Введите"
                onChange={textHandler}
            />
            <Button 
                text='Найти'
                customClass='primary'
                callback={searchHandler}
            />
            {/* <button
                className="button-primary"
                onClick={searchHandler}
            >Найти</button> */}
        </div>

    )
}