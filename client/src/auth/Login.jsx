import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiEndpoint } from '../helpers/config';
import useLocalStorage from '../hooks/useLocalStorage';
import usePageLoader from '../hooks/usePageLoader';
import useRequireGuest from '../hooks/useRequireGuest';
import Logo from '../components/inc/Logo'
import { Link } from 'react-router-dom'
import { error, success } from '../helpers/toastHelper'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState({});
    const [user, setUser] = useLocalStorage('user', '');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${apiEndpoint}/login`, {
            email, password
        }).then(res => setResponse(res))
            .catch(err => setResponse(err));
    }

    useEffect(() => {

        if (response?.data?.user) {
            success(response.data.msg);
            setUser(response?.data?.user);
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        } else {
            error(response?.data?.msg);
        }

        console.log(response)
    }, [response]);

    const [loading, setLoading, loaded] = usePageLoader({
        main: <>
            <div className="container">
                <Logo />

                <div className="col-md-6 mt-5 mx-auto">
                    <h3>Login</h3>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input required type="email" className="form-control" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input required type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/register" style={{ marginLeft: "20px" }}>Join now?</Link>

                    </form>

                </div>

            </div>
        </>,
        initial: true
    })

    return <>{useRequireGuest(loaded)}</>
}