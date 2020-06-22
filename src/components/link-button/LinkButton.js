import React from 'react'
import './LinkButton.scss'
import { Link } from 'react-router-dom'

const LinkButton = ({ children, to }) => {
    return (
        <div className="link-button">
            <Link to={to}>{children}</Link>
        </div>
    )
}

export default LinkButton