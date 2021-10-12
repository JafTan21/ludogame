import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import useLocalStorage from './useLocalStorage'

export default function useRequireAuth(initial) {
    const [user] = useLocalStorage('user', '')
    const [auth, setAuth] = useState(true);

    useEffect(() => {
        if (!user?.id) {
            setAuth(false);
        }
    }, [])

    return auth
        ? (initial instanceof Function ? initial() : initial)
        : <Redirect to="/login" />
}
