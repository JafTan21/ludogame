import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SocketContext } from 'services/socket';
import useLocalStorage from './useLocalStorage';


export default function useSocket() {

    const [connected, setConnected] = useState(false);
    const [user] = useLocalStorage('user', '')

    const socket = useContext(SocketContext);
    const connction_accepted = useCallback(() => setConnected(true), []);
    const SEND_CONNECTION_REQUEST = useCallback(() => {
        socket.emit('CONNECTION_REQUEST', { user_id: user.id });
    }, []);

    useEffect(() => {
        socket.on('CONNECTION_REQUEST_ACCEPTED', connction_accepted);

        return () => {
            socket.off('CONNECTION_REQUEST_ACCEPTED', connction_accepted);
        }
    }, [socket]);

    useEffect(SEND_CONNECTION_REQUEST, []);

    return connected ? socket : null;
}
