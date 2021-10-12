import React from 'react'
import usePageLoader from '../hooks/usePageLoader'
import useRequireAuth from '../hooks/useRequireAuth';

export default function Home() {

    const [loading, setLoading, loaded] = usePageLoader({
        main: <>
            hello home
        </>,
        initial: true,
    })

    return <> {useRequireAuth(loaded)}</>
}
