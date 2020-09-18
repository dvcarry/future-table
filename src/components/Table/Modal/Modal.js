import React, { useState } from 'react';
import { dataDesc } from '../../../data/data';
import { Button } from '../../Button/Button';
import './Modal.css'

export const Modal = ({ showModal, addData }) => {

    const [input, setInput] = useState({})

    const filledInputs = Object.values(input).filter(item => item !== '').length / dataDesc.filter(data => data.showInForm).length === 1

    const inputHandler = event => {
        const newInput = {
            [event.target.name]: event.target.value
        }
        setInput({
            ...input,
            ...newInput
        })
    }

    return (
        <>
            <div className='Modal'>
                <h3 className='form_heading'>Введите данные</h3>
                <form className='form'>
                    {
                        dataDesc
                            .filter(data => data.showInForm)
                            .map(item => {
                                return (
                                    <label key={item.id}>
                                        {item.placeholder}
                                        <input
                                            type='text'
                                            name={item.name}
                                            className="form_input"
                                            onChange={inputHandler}
                                            value={input[item.name] || ''}
                                        />
                                    </label>

                                )
                            })
                    }

                </form>
                <div className='buttons'>
                    <Button
                        text='Добавить в таблицу'
                        customClass='primary'
                        disabled={!filledInputs}
                        callback={() => addData(input)}
                    />
                    <Button
                        text='Отмена'
                        customClass='default'
                        callback={() => showModal(false)}
                    />
                </div>
            </div>
            <div
                className='Backdrop'
                onClick={() => showModal(false)}
            ></div>
        </>

    )
}