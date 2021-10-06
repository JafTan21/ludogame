import React from 'react'

export default function Path({ position, color }) {
    return (
        <div className="path" style={position}>
            <div className="path-box" style={{ border: `1px solid ${color}` }}></div>
            <div className="path-box" style={{ border: `1px solid ${color}` }}></div>
            <div className="path-box" style={{ border: `1px solid ${color}` }}></div>
            <div className="path-box" style={{ border: `1px solid ${color}` }}></div>
            <div className="path-box" style={{ border: `1px solid ${color}` }}></div>
            <div className="path-box" style={{ border: `1px solid ${color}` }}></div>
        </div>
    )
}
