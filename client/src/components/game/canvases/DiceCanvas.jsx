import React, { useEffect, useRef } from 'react'
import Dice from '../../../classes/DIce';
import useSocket from '../../../hooks/useSocket'

export default function DiceCanvas() {

    const diceRef = useRef(null)
    const [socket] = useSocket();

    useEffect(() => {
        diceRef.current.height = 60;
        diceRef.current.width = 60;
        diceRef.current.style.border = '1px solid black';
        const diceCtx = diceRef.current.getContext('2d')

        const dice = new Dice({ ctx: diceCtx, size: diceRef.current.width });

        diceRef.current.addEventListener('click', e => {
            const result = dice.toss();
            console.log(result)
        });
    }, [])

    return (
        <div>
            <canvas ref={diceRef} />
        </div>
    )
}
