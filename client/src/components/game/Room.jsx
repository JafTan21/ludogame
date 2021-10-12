import React, { useEffect, useState } from 'react'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import useLocalStorage from '../../hooks/useLocalStorage'
import useQueryString from '../../hooks/useQueryString'
import useRequireAuth from '../../hooks/useRequireAuth'
import useSocket from '../../hooks/useSocket'
import { useBeforeunload } from 'react-beforeunload';

export default function Room() {

    // useBeforeunload(() => 'You’ll lose your data!');

    const [socket] = useSocket()
    const [room, setRoom] = useState('')
    const [queryString] = useQueryString()
    const [user] = useLocalStorage('user', '')
    const [auth] = useIsAuthenticated();
    const [players, setPlayers] = useState([])


    useEffect(() => {
        if (!queryString || !auth) return;
        socket.emit('join_room', {
            user: user.id,
            room: queryString.room,
            asCreator: (queryString.as == 'admin')

        });
        socket.on('room_not_found', ({ socketId, socketIdFor }) => {
            if (socketIdFor == user.id) {
                alert('Room not found.');
                window.location.href = "/join-room";
                return;
            }
        });
        socket.on('joined', ({ room, data, socketId, socketIdFor }) => {
            if (socketId !== socket.id && socketIdFor == user.id) {
                alert('You joined with another device.');
                window.location.href = "/home";
                return;
            }
            console.log('joined: ' + room + "(" + socket.id + ")");
            setPlayers(data);
            setRoom(room)
        })
    }, [queryString])

    useEffect(() => {
        console.log('players: ', players)
    }, [players])

    return <>{useRequireAuth(<>
        {room}
    </>)}</>
}
