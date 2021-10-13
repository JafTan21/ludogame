import React from 'react'
import { Link } from 'react-router-dom';
import usePageLoader from '../hooks/usePageLoader'
import useRequireAuth from '../hooks/useRequireAuth';

import Logo from './inc/Logo';
import { success } from '../helpers/toastHelper';

export default function Home() {

    const [loading, setLoading, loaded] = usePageLoader({
        main: <>
            <Logo />
            <div className="container">
                <div className="card bg-warning mt-5">
                    <div className="card-body">
                        <Link to="/create-room" className="w-100 btn btn-success">
                            Create a room
                        </Link>
                        <Link to="/join-room" className="mt-2 w-100 btn btn-success">
                            Join a room
                        </Link>
                    </div>
                </div>
            </div>
        </>,
        initial: true,
    })

    return <> {useRequireAuth(loaded)}</>
}
