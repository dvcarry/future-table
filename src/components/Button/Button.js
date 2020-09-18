import React from 'react';
import './Button.css'

export const Button = ({ text, callback, customClass, disabled = false }) => {


    let classes = ['Button']

    if (disabled) {
        classes.push('disabled')
    } else {
        if (customClass) {
            classes.push(customClass)
        }
    }

    return (
        <button
            className={classes.join(' ')}
            onClick={callback}
            disabled={disabled}
        >
            {text}
        </button>
    )
}