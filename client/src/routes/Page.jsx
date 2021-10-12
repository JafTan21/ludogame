import React, { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Login from '../auth/Login'
import Register from '../auth/Register'
import CreateRoom from '../components/game/CreateRoom'
import JoinRoom from '../components/game/JoinRoom'
import Room from '../components/game/Room'
import Home from '../components/Home'

const PageNotFound = () => {

    const [time, setTime] = useState(6);
    useEffect(() => setTime(time - 1), []);
    useEffect(() => {
        (time <= 0)
            ? window.location.href = "/home"
            : setTimeout(() => setTime(time - 1), 1000);
    }, [time]);

    return (
        <div>
            This page was not found... <br />
            redirecting to home in {time} seconds.

            <Link to="/home">Home</Link>
        </div>
    )
}

export default function Page() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <Route exact path="/create-room" component={CreateRoom} />
                <Route exact path="/join-room" component={JoinRoom} />
                <Route exact path="/room" component={Room} />




                <Route component={PageNotFound} />
            </Switch>
        </>
    )
}
