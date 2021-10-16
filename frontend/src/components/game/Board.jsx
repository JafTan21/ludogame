import useSocket from 'hooks/useSocket';
import React, { useRef } from 'react'
import { useEffect } from 'react'
import BoardCanvas from 'components/game/canvases/BoardCanvas';
import DiceCanvas from 'components/game/canvases/DiceCanvas';
import useRequireAuth from 'hooks/auth/useRequireAuth';
import Header from 'components/inc/Header';

export default function Board() {

    return (
        <>
            {
                useRequireAuth(<>
                    <div className="container">
                        <BoardCanvas />
                        <DiceCanvas />
                    </div>
                </>)
            }
            {/* <DiceCanvas /> */}
        </>
    )
}
