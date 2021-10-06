import React from 'react'
import PlayerArea from './Ludo/PlayerArea'
import WinningBox from './Ludo/WinningBox'

export default function Game() {
    return (
        <>
            <div className="board">

                <PlayerArea color="red" cornerPosition={{ top: 0, left: 0 }} pathPosition={{
                    line1: { top: "150px", left: 0 },
                    line2: { top: "180px", left: 0 },
                    line3: { top: "210px", left: 0 },
                }} />

                <PlayerArea color="yellow" cornerPosition={{ top: 0, right: 0 }} pathPosition={{
                    line1: { top: "60px", transform: "rotate(90deg)", left: "150px" },
                    line2: { top: "60px", transform: "rotate(90deg)", left: "120px" },
                    line3: { top: "60px", transform: "rotate(90deg)", left: "90px" },
                }} />

                <PlayerArea color="green" cornerPosition={{ bottom: 0, left: 0 }} pathPosition={{
                    line1: { bottom: "60px", transform: "rotate(90deg)", left: "150px" },
                    line2: { bottom: "60px", transform: "rotate(90deg)", left: "120px" },
                    line3: { bottom: "60px", transform: "rotate(90deg)", left: "90px" },
                }} />

                <PlayerArea color="blue" cornerPosition={{ bottom: 0, right: 0 }} pathPosition={{
                    line1: { top: "150px", right: 0 },
                    line2: { top: "180px", right: 0 },
                    line3: { top: "210px", right: 0 },
                }} />



                <WinningBox />


                <div className="point"></div>

            </div>

        </>
    )
}
