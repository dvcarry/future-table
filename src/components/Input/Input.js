import React from 'react';
import './index.css'

export const Input = ({ onChangeHandler }) => {

    const changeHandler = event => {
        onChangeHandler(event.target.value)
    }

    return (
        <div className='inputblock'>
            <select className="uk-select inputblock_select" onChange={changeHandler}>
                <option></option>
                <option type="text" value="small">Маленький</option>
                <option type="text" value="big">Большой</option>
            </select>
        </div>

    )
}
