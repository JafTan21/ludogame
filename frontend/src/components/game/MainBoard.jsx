import Board from 'classes/Board';
import Player from 'classes/Player';
import { BOARD_SIZE, COLORS } from 'helper/config';
import { success } from 'helper/toastHelper';
import useLocalStorage from 'hooks/useLocalStorage';
import useQueryString from 'hooks/useQueryString';
import useSocket from 'hooks/useSocket';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import MainDice from './MainDice';

let board;

let count = 0;

const getColor = (num) => {
    if (num == 1) return COLORS.BLUE;
    if (num == 2) return COLORS.GREEN;
    if (num == 3) return COLORS.RED;
    if (num == 4) return COLORS.YELLOW;
}


export default function MainBoard() {


    const socket = useSocket();

    const query = useQueryString();
    const room = useMemo(() => query.room_name, [query])
    const user = useMemo(() => JSON.parse(window.localStorage.getItem('user')), [])

    const [player, setPlayer] = useState(null)

    const boardRef = useRef(null);
    const players = useMemo(() => {
        if (!board) return;
        const ctx = boardRef.current.getContext('2d');
        let tempPlayers = {};

        let temp = {
            1: query.player1,
            2: query.player2,
            3: query.player3,
            4: query.player4,
        }

        for (let i = 1; i <= 4; i++) {
            let p = new Player({ ctx, num: i, user_id: temp[i], color: getColor(i) });
            let { x, y } = Board.getPositionOfHome(p.color);
            if (p.user_id == user.id) {
                setPlayer(p);
            }
            tempPlayers[i] = p;
            p.draw();
            board.addPlayer(p);
        }

        return tempPlayers;
    }, [query, board]);

    useEffect(() => {
        const canvas = boardRef.current;
        canvas.style.border = '2px solid black';
        canvas.width = BOARD_SIZE;
        canvas.height = BOARD_SIZE;
        const ctx = canvas.getContext('2d');
        board = new Board({ ctx });
        board.init();

        success('Game started');
    }, []);

    useEffect(() => console.log('socket changed'), [socket])
    useEffect(() => console.log('room changed'), [room])
    useEffect(() => console.log('player: ', player), [player])


    const getCursorPosition = (event) => {
        const canvas = boardRef.current;
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return { x, y }
    }

    const soldier_in_range = (e) => {
        const { x, y } = getCursorPosition(e);
        let updated = false;
        for (const [color, _player] of Object.entries(board.players)) {
            for (const [num, soldier] of Object.entries(board.players[color].soldiers)) {
                let maxX = soldier.x + Player.spot_size;
                let maxY = soldier.y + Player.spot_size;
                // console.log(soldier, x, y, maxX, maxY)
                if (x > soldier.x && x < maxX
                    && y > soldier.y && y < maxY
                ) {
                    // console.log(soldier)
                    // console.log(color, num, x, y, soldier.x, soldier.y, maxX, maxY);
                    if (_player.currentPosition[num] + 5 < 57) {
                        _player.activeSoldier(num);
                        _player.updateCurrentPosition({
                            num,
                            position: _player.currentPosition[num] + 5
                        });
                        updated = true;
                        break;
                    }
                }
            }
        }
        if (updated)
            board.draw();
        // board.clearAndDraw();
    }

    const handleCanvasOnClick = (e) => {
        soldier_in_range(e);
    }

    return (
        <>
            {count++}
            <div className="container">
                <div className="d-flex justify-content-center mt-5">
                    <canvas ref={boardRef} onClick={handleCanvasOnClick} />
                </div>


                {/* dice */}
                <MainDice />

            </div>
        </>
    )
}
