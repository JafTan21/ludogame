import React, { useEffect, useState } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'

export default function useIsAuthenticated() {
    const [user] = useLocalStorage('user', '')
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if (user?.id) {
            setAuth(true);
        }
    }, [user])

    return [auth, setAuth];
}
