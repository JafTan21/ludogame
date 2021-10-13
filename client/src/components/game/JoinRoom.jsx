import React, { useEffect, useState } from 'react'
import usePageLoader from '../../hooks/usePageLoader'
import useRequireAuth from '../../hooks/useRequireAuth'
import useSocket from '../../hooks/useSocket'
import { Link, Redirect } from 'react-router-dom'
import useLocalStorage from '../../hooks/useLocalStorage'

import { toast } from 'react-toastify';
import Logo from '../inc/Logo'
import { error, success } from '../../helpers/toastHelper'
import Header from '../inc/Header'

export default function JoinRoom() {

    const [socket] = useSocket();
    const [room, setRoom] = useState('')
    const [user] = useLocalStorage('user')
    const [joined, setJoined] = useState(false);

    const join = () => {
        if (!room) {
            error('Room is invalid')
            return;
        }
        socket.on('room_full', ({ socketId }) => {
            if (socketId == socket.id) {
                error('Room is full');
                return;
            }
        })
        socket.on('game_started', ({ socketId }) => {
            if (socketId == socket.id) {
                error('Game started');
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

                        <div className="container">

                            <Header />

                            <div className="d-flex flex-column justify-content-center " style={{ height: "400px" }}>
                                <div className="form-group">
                                    <span>Enter Room Id</span>
                                    <input value={room} onChange={e => setRoom(e.target.value)} type="text" className="form-control " />
                                </div>
                                <div className="form-group mt-3" >
                                    <button className="btn btn-success" onClick={join}>join</button>

                                </div>
                            </div>
                        </div>

                    </>}
        </>,
        initial: true,
    })

    return <> {useRequireAuth(loaded)}</>
}
