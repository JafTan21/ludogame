import React from 'react'
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min'
import PageNotFound from '../Components/PageNotFound'
import Login from './Auth/Login'
import Home from './Home'

export default function Routes() {
    return (
        <>
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />

                <Route component={PageNotFound} />
            </Switch>
        </>
    )
}
