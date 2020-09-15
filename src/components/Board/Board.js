import React from 'react';

export const Board = ({ user }) => {

    const { firstName, lastName, description, address } = user
    const { streetAddress, city, state, zip } = address

    return (
        <div className='board'>
            <p>Выбран пользователь: <b>{`${firstName} ${lastName}`}</b></p>
            <p>Описание: <b>{description}</b></p>
            <p>Адрес проживания: <b>{streetAddress}</b></p>
            <p>Город: <b>{city}</b></p>
            <p>Провинция/штат: <b>{state}</b></p>
            <p>Индекс: <b>{zip}</b></p>
        </div>
    )
}