import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from 'react-router-dom'
import Routes from './Routes'

export default function MainRouter() {
    return (
        <Router>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
            <Routes />
        </Router>
    )
}
