import React, { useEffect, useState } from 'react'


const getSavedValue = (key, initial, forceSave) => {

    if (forceSave) {
        localStorage.removeItem(key)
    }

    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;

    if (initial instanceof Function) return initial()
    return initial
}


export default function useLocalStorage(key, initial, forceSave = false) {

    const [state, setState] = useState(() => getSavedValue(key, initial, forceSave))

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])

    return [state, setState]

}
