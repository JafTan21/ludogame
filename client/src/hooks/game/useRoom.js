// import React, { useEffect } from 'react'
// import useLocalStorage from '../useLocalStorage'
// import useSocket from '../useSocket'

// export default function useRoom({ room }) {
//     const [socket] = useSocket()
//     const [user] = useLocalStorage('user', '')
//     useEffect(() => {
//         socket.emit('join_room', { user: user.id, room })
//         socket.on('joined', ({ room, data, socketId }) => {
//             if (socketId !== socket.id) {
//                 alert('You joined with another device.');
//                 window.location.href = "/home";
//                 return;
//             }
//             console.log('joined: ' + room, data, socketId + "    ----    " + socket.id);
//             setRoom(room)
//             setJoined(true);
//         })
//     }, [])
// }
