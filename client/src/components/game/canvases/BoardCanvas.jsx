import React, { useEffect, useMemo, useRef } from 'react'
import useDrawingFunctions from '../../../hooks/game/useDrawingFunctions';
import useGameConstants from '../../../hooks/game/useGameConstants';
import Player from '../../../Classes/Player';
import useQueryString from '../../../hooks/useQueryString';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useUpdateLogger from '../../../hooks/useUpdateLogger';

export default function BoardCanvas() {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const { BOARD_SIZE, HOME_SIZE, COLORS } = useMemo(useGameConstants);
    const [initGame] = useDrawingFunctions();
    const [players, setPlayers] = useLocalStorage('players', '')
    const playerObjects = [];
    const [query] = useQueryString()


    useEffect(() => {
        const canvas = canvasRef.current
        canvas.style.border = '2px solid black';
        canvas.width = BOARD_SIZE;
        canvas.height = BOARD_SIZE;
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;

        initGame(ctx);

        // const player = new Player({ ctx, color: COLORS.RED ,userId:});
        // player.draw();


    }, [])

    useUpdateLogger(players, Object.entries);

    useEffect(() => {
        if (!query) return;
        setPlayers(JSON.parse(query.players));
    }, [query])

    useEffect(() => {
        for (const [key, player] of Object.entries(players)) {
            playerObjects.push(
                new Player({ ctx: ctxRef.current, color: player.color })
            );
        }

        playerObjects.forEach(player => {
            player.draw();
        })
    }, [players])


    return <>
        <canvas ref={canvasRef} />
    </>
}
