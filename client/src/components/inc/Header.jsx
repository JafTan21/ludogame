import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
    return (
        <>

            <Link to="/home" className="btn btn-sm btn-danger mt-3 text-white">
                <i className="fas fa-chevron-left"></i>
                <span style={{ marginLeft: "5px" }}>Go Back</span>
            </Link>
            <Logo />
        </>
    )
}
