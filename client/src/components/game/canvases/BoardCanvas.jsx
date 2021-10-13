import React, { useEffect, useMemo, useRef } from 'react'
import useDrawingFunctions from '../../../hooks/game/useDrawingFunctions';
import useGameConstants from '../../../hooks/game/useGameConstants';
import useQueryString from '../../../hooks/useQueryString';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useUpdateLogger from '../../../hooks/useUpdateLogger';
import Player from '../../../classes/Player';

export default function BoardCanvas() {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const { BOARD_SIZE, HOME_SIZE, COLORS, HOME_BOX_SIZE } = useMemo(useGameConstants);
    const [initGame] = useDrawingFunctions();
    const [players, setPlayers] = useLocalStorage('players', '')
    const [query] = useQueryString()

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.style.border = '2px solid black';
        canvas.width = BOARD_SIZE;
        canvas.height = BOARD_SIZE;
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;

        initGame(ctx);
        const p1 = new Player(ctx, COLORS.RED);
        const p2 = new Player(ctx, COLORS.GREEN);
        const p3 = new Player(ctx, COLORS.BLUE);
        const p4 = new Player(ctx, COLORS.YELLOW);

    }, [])

    useUpdateLogger(players, Object.entries);

    useEffect(() => {
        if (!query) return;
        setPlayers(JSON.parse(query.players));
    }, [query])

    return <>
        <canvas ref={canvasRef} />
    </>
}
