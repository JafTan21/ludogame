import React, { useEffect, useState } from 'react'
import usePageLoader from '../../hooks/usePageLoader'
import useRequireAuth from '../../hooks/useRequireAuth'
import useSocket from '../../hooks/useSocket'
import { Redirect } from 'react-router-dom'
import useLocalStorage from '../../hooks/useLocalStorage'

export default function JoinRoom() {

    const [socket] = useSocket();
    const [room, setRoom] = useState('')
    const [user] = useLocalStorage('user')
    const [joined, setJoined] = useState(false);

    const join = () => {
        if (!room) return;
        socket.on('room_full', ({ socketId }) => {
            if (socketId == socket.id) {
                alert('Room is full');
                return;
            }
        })
        socket.on('game_started', ({ socketId }) => {
            if (socketId == socket.id) {
                alert('Game started');
                return;
            }
        })
        setJoined(true);
        setRoom(room)
    }

    const [loading, setLoading, loaded] = usePageLoader({
        main: <>
            {
                joined
                    ? <Redirect to={`/room?room=${room}&as=player`} />
                    : <>
                        <input type="text" value={room} onChange={e => setRoom(e.target.value)} />
                        <button className="btn btn-success" onClick={join}>join</button>
                    </>}
        </>,
        initial: true,
    })

    return <> {useRequireAuth(loaded)}</>
}
