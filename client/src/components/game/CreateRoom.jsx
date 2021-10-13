import React, { useEffect, useState } from 'react'
import usePageLoader from '../../hooks/usePageLoader'
import useRequireAuth from '../../hooks/useRequireAuth'
import useSocket from '../../hooks/useSocket'
import { Redirect } from 'react-router-dom'

export default function CreateRoom() {

    const [socket] = useSocket();
    const [createdRoom, setCreatedRoom] = useState('')
    const create_room = () => {
        socket.emit('create_room', {
            room: 'r' + Math.floor((Math.random() * 999999) + 100000)
        });

        socket.on('send_created_room', ({ room }) => {
            setCreatedRoom(room)
        });
    }

    useEffect(() => {

    }, [createdRoom])

    const [loading, setLoading, loaded] = usePageLoader({
        main: <>
            {
                createdRoom
                    ? <Redirect to={`/room?room=${createdRoom}&as=admin`} />
                    : <div>
                        <p>Create room</p>
                        <p>{createdRoom}</p>
                        <button onClick={create_room} className="btn btn-success">Create</button>
                    </div>

            }
        </>,
        initial: true,
    })

    return <> {useRequireAuth(loaded)}</>
}
