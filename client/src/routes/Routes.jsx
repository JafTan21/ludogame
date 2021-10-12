import React from 'react'
import { Link } from 'react-router-dom'
import useIsAuthenticated from '../hooks/useIsAuthenticated'
import useLocalStorage from '../hooks/useLocalStorage'
import usePageLoader from '../hooks/usePageLoader'
import useRequireAuth from '../hooks/useRequireAuth'
import useRequireGuest from '../hooks/useRequireGuest'

export default function Routes() {
    const [user, setUser] = useLocalStorage('user', '')
    const logout = () => {
        setUser(null)
        window.location.reload();
    }

    const [auth, setAuth] = useIsAuthenticated();

    const [loading, setLoading, loaded] = usePageLoader({
        main: <>
            <ul>
                {
                    auth
                        ? <>
                            <li>
                                <Link to="/home">home</Link>
                            </li>
                            <li>
                                <Link to="/create-room">create room</Link>
                            </li>
                            <li>
                                <Link to="/join-room">join room</Link>
                            </li>
                            <li>
                                <a href="#" onClick={logout}>Logout</a>
                            </li>
                        </>
                        : <>
                            <li>
                                <Link to="/login">login</Link>
                            </li>
                            <li>
                                <Link to="/register">register</Link>
                            </li>
                        </>
                }
            </ul>
        </>,
        initial: true
    })

    return <>{loaded}</>;


}
