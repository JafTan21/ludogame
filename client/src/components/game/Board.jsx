import React, { useEffect, useState } from 'react'
import useQueryString from '../../hooks/useQueryString'
import BoardCanvas from '../game/canvases/BoardCanvas'
import DiceCanvas from '../game/canvases/DiceCanvas'
import useLocalStorage from '../../hooks/useLocalStorage'

export default function Board() {

    const [query] = useQueryString()
    localStorage.removeItem('players')
    const [players, setPlayers] = useLocalStorage('players', '', true)


    useEffect(() => {
        if (!query) return;
        setPlayers(query.players)
    }, [query])


    return (
        <div>
            <BoardCanvas />
            <DiceCanvas />
        </div>
    )
}
