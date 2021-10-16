import React, { useEffect, useState } from 'react'
import queryString from 'query-string'

export default function useQueryString() {
    const [query, setQuery] = useState('')

    useEffect(() => {
        setQuery(queryString.parse(window.location.search))
    }, [])

    return query;
}
