import React, { useEffect, useState } from 'react'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import useLocalStorage from '../../hooks/useLocalStorage'
import useQueryString from '../../hooks/useQueryString'
import useRequireAuth from '../../hooks/useRequireAuth'
import useSocket from '../../hooks/useSocket'
import { Redirect } from 'react-router'
import { toast } from 'react-toastify';
import Header from '../inc/Header'

export default function Room() {

    // useBeforeunload(() => 'You’ll lose your data!');

    const [socket] = useSocket()
    const [room, setRoom] = useState('')
    const [queryString] = useQueryString()
    const [user] = useLocalStorage('user', '')
    const [auth] = useIsAuthenticated();
    const [players, setPlayers] = useLocalStorage('players', [], true)
    const [gameStarted, setGameStarted] = useState(false)

    useEffect(() => {
        if (!queryString || !auth) return;
        socket.emit('join_room', {
            user: user.id,
            room: queryString.room,
            asCreator: (queryString.as == 'admin')

        });
        socket.on('room_not_found', ({ socketIdFor }) => {
            if (socketIdFor == user.id) {
                toast('Room not found.');
                window.location.href = "/join-room";
                return;
            }
        });
        socket.on('joined', ({ room, data, socketId, socketIdFor }) => {
            console.log('joined: ' + room + "(" + socket.id + ")");
            setPlayers(data);
            setRoom(room)
        })

        socket.on('start_game', () => {
            console.log('starting: ' + room + "(" + socket.id + ")");
            setGameStarted(true);
        })
    }, [queryString])

    useEffect(() => {
        console.log('players: ', players)
    }, [players])

    return <>
        {
            useRequireAuth(
                <>
                    {
                        gameStarted
                            ? <Redirect to={`/board?room=${room}&players=${encodeURIComponent(JSON.stringify(players))}`} />
                            : <>
                                <div className="container">
                                    <Header />
                                    Room id: {room}
                                    {
                                        players.map((player, key) => <li key={key}>Player: {player.player}</li>)
                                    }
                                </div>
                            </>
                    }
                </>
            )
        }
    </>
}
