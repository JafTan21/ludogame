import React, { useEffect, useState } from 'react'
import useGameConstants from '../../hooks/game/useGameConstants'
import useQueryString from '../../hooks/useQueryString'
import BoardCanvas from '../game/canvases/BoardCanvas'
import useLocalStorage from '../../hooks/useLocalStorage'
import useUpdateLogger from '../../hooks/useUpdateLogger'
import Player from '../../Classes/Player'

export default function Board() {

    const [query] = useQueryString()
    localStorage.removeItem('players')
    const [players, setPlayers] = useLocalStorage('players', '', true)
    const playerObjects = [];
    const { COLORS } = useGameConstants()

    useEffect(() => {
        setPlayers(query.players)
    }, [query])


    return (
        <div>
            <BoardCanvas />
        </div>
    )
}
