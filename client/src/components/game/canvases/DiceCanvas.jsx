import React, { useEffect, useRef } from 'react'
import Dice from '../../../classes/DIce';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useQueryString from '../../../hooks/useQueryString';
import useSocket from '../../../hooks/useSocket'

export default function DiceCanvas() {

    const diceRef = useRef(null)
    const [query] = useQueryString()
    const [user] = useLocalStorage('user', '')

    const [socket] = useSocket();


    useEffect(() => {
        diceRef.current.height = 60;
        diceRef.current.width = 60;
        diceRef.current.style.border = '1px solid black';
    }, [])

    useEffect(() => {
        if (!query) return;
        console.log({ user: user.id, room: query.room, asCreator: true })
        socket.emit('join_room', { user: user.id, room: query.room, asCreator: true });


        socket.on('toss_for_other', ({ tosser, dice }) => {
            console.log(tosser, dice)
        });

        socket.on('joined', ({ room, data, socketId, socketIdFor }) => {
            console.log('joined: ' + room + "(" + socket.id + ")");
        })



        const diceCtx = diceRef.current.getContext('2d')

        const dice = new Dice({ ctx: diceCtx, size: diceRef.current.width });
        diceRef.current.addEventListener('click', e => {
            const result = dice.toss();
            console.log(result)
            socket.emit('toss', ({ user: user.id, dice: result, room: query.room }));
            console.log({ user: user.id, dice: result, room: query.room })
        });
    }, [query])

    return (
        <div>
            <canvas ref={diceRef} />
        </div>
    )
}
