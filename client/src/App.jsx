import React, { useEffect, useState } from 'react'
import usePageLoader from './hooks/usePageLoader'
import useSocket from './hooks/useSocket'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/Routes'
import Page from './routes/Page'
import './styles/home.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    const [loading, setLoading, loaded] = usePageLoader({
        main: <>
            <Router>
                <Routes />
                <Page />
            </Router>

            <ToastContainer />
        </>,
        initial: true
    })
    const [socket] = useSocket();


    return <>{loaded}</>;
}

