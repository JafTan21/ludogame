import Board from 'classes/Board';
import { Player } from 'classes/Player';
import { BOARD_SIZE, COLORS } from 'helper/config';
import useLocalStorage from 'hooks/useLocalStorage';
import useQueryString from 'hooks/useQueryString';
import useSocket from 'hooks/useSocket';
import React, { useEffect, useRef, useState } from 'react'

let board;

const getColor = (num) => {
    if (num == 1) return COLORS.BLUE;
    if (num == 2) return COLORS.GREEN;
    if (num == 3) return COLORS.RED;
    if (num == 4) return COLORS.YELLOW;
}

export default function BoardCanvas() {

    const socket = useSocket();

    const query = useQueryString();
    const [players, setPlayers] = useState({});
    const [room, setRoom] = useState('')
    const [user] = useLocalStorage('user', '')

    const boardRef = useRef(null);

    useEffect(() => {
        const canvas = boardRef.current;
        canvas.style.border = '2px solid black';
        canvas.width = BOARD_SIZE;
        canvas.height = BOARD_SIZE;

        const ctx = canvas.getContext('2d');
        board = new Board({ ctx });
        board.init();

    }, []);


    useEffect(() => {
        setPlayers({
            1: query.player1,
            2: query.player2,
            3: query.player3,
            4: query.player4,
        });
        setRoom(query.room_name);
    }, [query])

    useEffect(() => {
        if (!players[1]) return;
        const ctx = boardRef.current.getContext('2d');

        for (const [key, value] of Object.entries(players)) {
            let player = new Player({ ctx, num: key, user_id: value, color: getColor(key) });
            board.addPlayer(player);
        }

        console.log(board)
    }, [players])

    useEffect(() => {
        if (!socket) return;

        socket.emit('CHECK_AND_JOIN', { room_name: room, user_id: user.id });

        socket.on('user_tossed', handle_user_toss);
        socket.on('room_error', handle_room_error);
        return () => {
            socket.off('user_tossed', handle_user_toss);
            socket.off('room_error', handle_room_error);

        }
    }, [socket, room])



    const handle_room_error = ({ msg }) => {
        alert(msg)
        window.location.href = "/home";
    }

    const handle_user_toss = ({ user_id, result }) => {
        console.log(user_id, result)
    }

    const handleAnimation = () => {
        board.clearAndDraw();

        board.players.forEach(player => {
            // if (player.color == 'red')
            //     player.updateSoldierPosition({ soldierNum: 3, x: 100, y: 0 });

            player.draw();
        });
    }

    return <div className="d-flex justify-content-center mt-5">
        <canvas ref={boardRef} />
    </div >
}
