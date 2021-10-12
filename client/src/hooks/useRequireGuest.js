import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import useLocalStorage from './useLocalStorage'

export default function useRequireGuest(initial) {
    const [user] = useLocalStorage('user', '')
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (user?.id) {
            setAuth(true);
        }
    }, [])

    return auth
        ? <Redirect to="/home" />
        : (initial instanceof Function ? initial() : initial)
}
