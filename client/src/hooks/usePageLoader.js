import React, { useEffect, useState } from 'react'

const Loading = () => {
    return <>

        {/* <div className="m-atuo">
            <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div> */}

        {/* loading... */}
    </>
}

export default function usePageLoader({ initial, main }) {
    const [loading, setLoading] = useState(initial)

    useEffect(() => setLoading(false), [])


    return [loading, setLoading, loading ? <Loading /> : main]
}
