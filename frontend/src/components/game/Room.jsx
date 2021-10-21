import Header from 'components/inc/Header';
import useRequireAuth from 'hooks/auth/useRequireAuth';
import useLocalStorage from 'hooks/useLocalStorage';
import useQueryString from 'hooks/useQueryString'
import useSocket from 'hooks/useSocket';
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';

export default function Room() {

    const query = useQueryString();
    const [room, setRoom] = useState('')
    const socket = useSocket()
    const [user] = useLocalStorage('user', '')
    const [players, setPlayers] = useState([])
    const [started, setStarted] = useState(false)


    const handle_check_and_join_room = () => {
        console.log('joined..')
    }

    const handle_update_players = ({ players }) => {
        setPlayers(players)
    }

    const handle_room_error = ({ msg }) => {
        alert(msg)
    }

    useEffect(() => {
        setRoom(query.room);
    }, [query]);

    useEffect(() => {
        return () => {
            console.log('left room')
            // socket.emit('LEAVE_ROOM', { room_name: room, user_id: user.id });
        }
    }, [])

    useEffect(() => {
        console.log(players)
        if (players.length >= 4) {
            setStarted(true);
        }
    }, [players])

    useEffect(() => {
        if (!socket) return;

        socket.emit('CHECK_AND_JOIN', { room_name: room, user_id: user.id });


        socket.on('checked_and_room_joined', handle_check_and_join_room);
        socket.on('update_players', handle_update_players);
        socket.on('room_error', handle_room_error);

        return () => {
            socket.off('checked_and_room_joined', handle_check_and_join_room);
            socket.off('update_players', handle_update_players);
            socket.off('room_error', handle_room_error);
        }
    }, [room, socket])


    let playersString = ''
    if (started) {
        players.forEach((player, index) => {
            playersString = playersString + `player${index + 1}=${player}&`;
        })
    }

    return (
        <>{
            useRequireAuth(
                started
                    ? <Redirect to={`/board?${playersString}room_name=${room}`} />
                    // ? window.open(`/board?${playersString}room_name=${room}`)
                    : <div className="container">
                        <Header />

                        <div className="mt-5">
                            <h2>Room id: {room}</h2>
                            <h3>Players: </h3>
                            <ul>
                                {
                                    players.map((player, key) => {
                                        return <li key={key}>
                                            {player} {player == user.id ? '(You)' : ''}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>)
        }</>
    )
}
