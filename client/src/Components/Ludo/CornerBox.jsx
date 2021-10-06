import React from 'react'

export default function CornerBox({ position, color }) {


    return (
        <div className="corner-box" style={{ ...position, border: `1px solid ${color}` }}></div>
    )
}
