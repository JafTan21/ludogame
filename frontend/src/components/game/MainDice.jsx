import Dice from 'classes/Dice';
import { COLORS } from 'helper/config';
import useQueryString from 'hooks/useQueryString';
import useSocket from 'hooks/useSocket';
import React, { useRef, useMemo, useState, useEffect } from 'react'

let i = 0;
let dice;


const getColor = (num) => {
    if (num == 1) return COLORS.BLUE;
    if (num == 2) return COLORS.GREEN;
    if (num == 3) return COLORS.RED;
    if (num == 4) return COLORS.YELLOW;
}


export default function MainDice() {

    const socket = useSocket();
    const [tossOf, setTossOf] = useState(null);
    const query = useQueryString()
    const diceRef = useRef(null)
    const user = useMemo(() => JSON.parse(window.localStorage.getItem('user')), [])

    const [player, setPlayer] = useState(null)
    useEffect(() => {
        if (query.player1 == user.id) {
            setPlayer(getColor(1));
        }
        if (query.player2 == user.id) {
            setPlayer(getColor(2));
        }
        if (query.player3 == user.id) {
            setPlayer(getColor(3));
        }
        if (query.player4 == user.id) {
            setPlayer(getColor(4));
        }
    }, [query, user])

    useEffect(() => {
        console.log()
        diceRef.current.height = 60;
        diceRef.current.width = 60;
        diceRef.current.style.border = '1px solid black';
        diceRef.current.style.borderRadius = '10px';
        diceRef.current.style.background = '#fff';


        const diceCtx = diceRef.current.getContext('2d');
        dice = new Dice({ ctx: diceCtx, size: diceRef.current.height });

    }, [])

    useEffect(() => {
        if (!player) return;
        console.log('in dice: ', player)
        setTossOf(player.color)
    }, [player])


    // handlers
    const handleToss = () => {
        console.log('toss')
    }

    return (
        <>{i++}
            <div className="mt-4">
                <canvas ref={diceRef} onClick={handleToss} style={{ cursor: tossOf == player?.color ? 'pointer' : 'not-allowed' }} />
                <br />
                turn of {tossOf}
                <br />
                me: {player?.color}
            </div>
        </>
    )
}
