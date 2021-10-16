import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from 'components/inc/Header'
import useRequireAuth from 'hooks/auth/useRequireAuth'
import useSocket from 'hooks/useSocket';
import { Redirect } from 'react-router';
import useLocalStorage from 'hooks/useLocalStorage';


export default function CreateRoom() {

    const [entry, setEntry] = useState(0);
    const socket = useSocket();
    const [disabled, setDisabled] = useState(false);
    const [created, setCreated] = useState(false);
    const [room, setRoom] = useState('');
    const [user] = useLocalStorage('user', '');

    useEffect(() => {
        console.log(socket)
    }, [socket])

    const CREATE_ROOM = (e) => {
        e.preventDefault();

        setDisabled(true);

        if (!socket || isNaN(entry) || entry <= 0) {
            setDisabled(false);
            alert('please check your connection and entry fee.')
        }
        const room_name = 'r' + Math.floor((Math.random() * 999999) + 100000);
        setRoom(room_name);
        socket.emit('CREATE_ROOM', { room_name, entry_fee: entry, user_id: user.id });
    }

    const handle_room_created = () => {
        setCreated(true);
    }

    useEffect(() => {
        if (!socket) return;

        socket.on('room_created', handle_room_created);

        return () => {
            socket.off('room_created', handle_room_created);
        }
    }, [disabled])

    return (
        <>
            {
                useRequireAuth(
                    created
                        ? <Redirect to={`/room?room=${room}`} />
                        : <div className="container">

                            <Header />

                            <div className="d-flex flex-column justify-content-center " style={{ height: "400px" }}>
                                <form onSubmit={CREATE_ROOM}>
                                    <div className="form-group">
                                        <span>Enter entry fee</span>
                                        <input
                                            value={entry} required
                                            onChange={e => setEntry(e.target.value)}
                                            type="number" className="form-control" />
                                    </div>
                                    <div className="form-group mt-3" >
                                        <button disabled={disabled} type="submit" className="btn btn-success ">Create</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                )
            }
        </>
    )
}
