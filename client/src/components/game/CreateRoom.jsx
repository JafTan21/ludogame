import React, { useEffect, useState } from 'react'
import usePageLoader from '../../hooks/usePageLoader'
import useRequireAuth from '../../hooks/useRequireAuth'
import useSocket from '../../hooks/useSocket'
import { Link, Redirect } from 'react-router-dom'

import Logo from '../inc/Logo'
import { error } from '../../helpers/toastHelper'
import Header from '../inc/Header'

export default function CreateRoom() {

    const [createdRoom, setCreatedRoom] = useState('')
    const [socket] = useSocket();
    const [entryFee, setEntryFee] = useState(0);
    const create_room = () => {

        if (!entryFee) {
            error('please enter a valid amount')
            return;
        }

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
                    : <div className="container">

                        <Header />

                        <div className="d-flex flex-column justify-content-center " style={{ height: "400px" }}>
                            <div className="form-group">
                                <span>Enter entry fee</span>
                                <input value={entryFee} onChange={e => setEntryFee(e.target.value)} type="text" className="form-control " />
                            </div>
                            <div className="form-group mt-3" >
                                <button onClick={create_room} className="btn btn-success ">Create</button>

                            </div>
                        </div>

                    </div>

            }
        </>,
        initial: true,
    })

    return <> {useRequireAuth(loaded)}</>
}
