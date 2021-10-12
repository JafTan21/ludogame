import React, { useEffect, useState } from 'react'

export default function usePageLoader({ initial, main }) {
    const [loading, setLoading] = useState(initial)

    useEffect(() => setLoading(false), [])


    return [loading, setLoading, loading ? <>Loading</> : main]
}
