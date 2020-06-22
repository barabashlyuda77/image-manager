import React from 'react'
import './Button.scss'

const Button = ({ children, onClick }) => {
    return (
        <div className="button" onClick={onClick}>
            <a href="#">{children}</a>
        </div>
    )
}

export default Button