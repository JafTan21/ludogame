import axios from 'axios';
import { apiEndpoint } from 'helper/config';
import { success } from 'helper/toastHelper';
import useRequireGuest from 'hooks/auth/useRequireGuest';
import useLocalStorage from 'hooks/useLocalStorage';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

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
    }, [response]);


    return <>{useRequireGuest(
        <div className="container">
            {/* <Logo /> */}

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
    )}</>
}
