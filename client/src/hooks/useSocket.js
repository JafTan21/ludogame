
import { useEffect } from "react";
import io from "socket.io-client";
import { socketEndpoint } from '../helpers/config';
import useLocalStorage from "./useLocalStorage";


let socket;
export default function useSocket(room = '') {
    const [user] = useLocalStorage('user', '')

    useEffect(() => {
        socket = io(socketEndpoint)
        if (room) {
            socket.emit('join_room', { user: user.id, room })
        }
        return () => {
            socket.off()
        }
    }, [])

    useEffect(() => {
        console.log('socket connection: ', socket.id)
        socket.emit('show_rooms');
    }, [socket])


    return [socket]

}
