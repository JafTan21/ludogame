import Header from 'components/inc/Header'
import { success } from 'helper/toastHelper';
import useRequireAuth from 'hooks/auth/useRequireAuth'
import useLocalStorage from 'hooks/useLocalStorage';
import useSocket from 'hooks/useSocket';
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';

export default function JoinRoom() {

    const [roomName, setRoomName] = useState('')
    const socket = useSocket();
    const [disabled, setDisabled] = useState(false);
    const [joined, setJoined] = useState(false);
    const [user] = useLocalStorage('user', '');

    const JOIN_ROOM = (e) => {
        e.preventDefault();

        setDisabled(true);

        if (!socket || !roomName) return;
        socket.emit('JOIN_ROOM', { room_name: roomName, user_id: user.id });
    }

    const handle_room_joined = () => {
        setJoined(true);
        success('Joined successfully');

    }

    const handle_room_error = ({ msg }) => {
        setDisabled(false);
        alert(msg)
    }

    useEffect(() => {
        if (!socket) return;

        socket.on('room_joined', handle_room_joined);
        socket.on('room_error', handle_room_error);

        return () => {
            socket.off('room_joined', handle_room_joined);
            socket.off('room_error', handle_room_error);
        }
    }, [socket])

    return (
        <>{
            useRequireAuth(
                joined
                    ? <Redirect to={`/room?room=${roomName}`} />
                    : <div className="container">

                        <Header />

                        <div className="d-flex flex-column justify-content-center " style={{ height: "400px" }}>
                            <form onSubmit={JOIN_ROOM}>
                                <div className="form-group">
                                    <span>Enter Room Id</span>
                                    <input
                                        value={roomName} onChange={e => setRoomName(e.target.value)}
                                        type="text" className="form-control " />
                                </div>
                                <div className="form-group mt-3" >
                                    <button disabled={disabled} type="submit" className="btn btn-success" >join</button>
                                </div>
                            </form>
                        </div>
                    </div>

            )
        }</>
    )
}
