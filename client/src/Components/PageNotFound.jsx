import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div>
            This page was not found

            <Link to="/home">Home</Link>
        </div>
    )
}
