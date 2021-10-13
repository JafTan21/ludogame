
import { useEffect } from "react";
import io from "socket.io-client";
import { socketEndpoint } from '../helpers/config';


let socket;
export default function useSocket() {


    useEffect(() => {
        socket = io(socketEndpoint)
        return () => {
            socket.off()
        }
    }, [])

    useEffect(() => {
        console.log('socket connection: ', socket.id)
    }, [socket])


    return [socket]

}
