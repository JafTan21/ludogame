import React, { useEffect } from 'react'

export default function useUpdateLogger(value, cb = null) {
    useEffect(() => {
        if (cb) console.log(value ? cb(value) : null)
        else console.log(value)
    }, [value])
}
