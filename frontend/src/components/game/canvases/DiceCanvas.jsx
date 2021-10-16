import { Dice } from 'classes/Dice'
import useLocalStorage from 'hooks/useLocalStorage';
import useQueryString from 'hooks/useQueryString';
import useSocket from 'hooks/useSocket'
import React, { useEffect, useRef, useState } from 'react'

let dice;
export default function DiceCanvas() {

    const [tosser, setTosser] = useState(0);
    const [result, setResult] = useState(0);
    const [user] = useLocalStorage('user', '')
    const socket = useSocket()
    const query = useQueryString()
    const [cursor, setCursor] = useState('not-allowed')
    const diceRef = useRef(null)

    useEffect(() => {
        diceRef.current.height = 60;
        diceRef.current.width = 60;
        diceRef.current.style.border = '1px solid black';
        diceRef.current.style.borderRadius = '10px';
        diceRef.current.style.background = '#fff';

        const ctx = diceRef.current.getContext('2d');
        dice = new Dice({ ctx, size: diceRef.current.height });


    }, [])

    const handle_user_tossed = ({ user_id, result }) => {
        setTosser(user_id);
        setResult(result);
    }

    useEffect(() => {
        if (!socket) return;

        socket.on('user_tossed', handle_user_tossed);

        return () => {
            socket.off('user_tossed', handle_user_tossed);
        }
    }, [socket])

    const handleToss = () => {
        const result = dice.toss();
        console.log(result)
        socket.emit('TOSS', { user_id: user.id, result, room: query.room_name });
    }

    return (
        <>
            {/* d-flex justify-content-center flex-column */}
            <div className="mt-4">
                <canvas style={{ cursor: cursor }} ref={diceRef} onClick={handleToss} />
                <br />
                turn of { }
            </div>
        </>
    )
}
