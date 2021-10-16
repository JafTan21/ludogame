import React, { useEffect, useState } from 'react'
import useIsAuthenticated from 'hooks/auth/useIsAuthenticated'
import { Redirect } from 'react-router-dom'

export default function useRequireGuest(initial) {
    const [auth] = useIsAuthenticated()

    const [loading, setLoading] = useState(true);

    useEffect(() => setLoading(false), [])

    return <>{
        !loading
            ? (!auth
                ? (initial instanceof Function ? initial() : initial)
                : <Redirect to="/home" />)
            : ''
    }</>
}
