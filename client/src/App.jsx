import React, { useEffect, useState } from 'react'
import usePageLoader from './hooks/usePageLoader'
import useSocket from './hooks/useSocket'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/Routes'
import Page from './routes/Page'
import './styles/home.css'

export default function App() {
    const [loading, setLoading, loaded] = usePageLoader({
        main: <>
            <div id="App">
                <div className="container">
                    <Router>
                        <Routes />
                        <Page />
                    </Router>
                </div>
            </div>
        </>,
        initial: true
    })
    const [socket] = useSocket();







    return <>{loaded}</>;
}

