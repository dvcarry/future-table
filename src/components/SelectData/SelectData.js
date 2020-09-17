import React from 'react';
import { typeOfData } from '../../data/data';
import './index.css'

export const SelectData = ({ onChangeHandler }) => {

    const changeHandler = event => {
        onChangeHandler(event.target.value)
    }

    return (
        <select className="selectdata" onChange={changeHandler}>
            <option selected disabled>Выберите данные</option>
            {
                typeOfData.map(type => {
                    return <option
                        type="text"
                        value={type.name}
                        key={type.name}
                    >
                        {type.title}
                    </option>
                })
            }
        </select>


    )
}
