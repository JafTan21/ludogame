import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiEndpoint } from '../helpers/config';
import useLocalStorage from '../hooks/useLocalStorage';
import usePageLoader from '../hooks/usePageLoader';
import useRequireAuth from '../hooks/useRequireAuth';
import useRequireGuest from '../hooks/useRequireGuest';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Logo from '../components/inc/Logo';
import { success } from '../helpers/toastHelper';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useLocalStorage('user', '');

    const [response, setResponse] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${apiEndpoint}/register`, {
            name, email, password,
        })
            .then(res => setResponse(res))
            .catch(res => setResponse(res));
    }

    useEffect(() => {
        if (response?.data?.msg) {
            success(response.data.msg);
        }
        if (response?.data?.user) {
            setUser(response?.data?.user);
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        }
        console.log(response)
    }, [response]);

    const [loading, setLoading, loaded] = usePageLoader({
        main: <>
            <div className="container">
                <Logo />

                <div className="col-md-6 mt-5 mx-auto">
                    <h3>Register</h3>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input required type="text" className="form-control" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input required type="email" className="form-control" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input required type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/login" style={{ marginLeft: "20px" }}>Sign in?</Link>

                    </form>

                </div>

            </div>
        </>,
        initial: true
    })

    return <>{useRequireGuest(loaded)}</>
}