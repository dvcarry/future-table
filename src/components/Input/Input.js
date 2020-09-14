import React from 'react';

export const Input = ({ onChangeHandler }) => {

    const changeHandler = event => {
        onChangeHandler(event.target.value)
    }

    return (
        <select className="uk-select" onChange={changeHandler}>
            <option></option>
            <option type="text" value="small">Маленький</option>
            <option type="text" value="big">Большой</option>
        </select>
    )
}
