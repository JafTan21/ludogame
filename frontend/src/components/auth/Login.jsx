import axios from 'axios';
import { apiEndpoint } from 'helper/config';
import { error, success } from 'helper/toastHelper';
import useRequireGuest from 'hooks/auth/useRequireGuest';
import useLocalStorage from 'hooks/useLocalStorage';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState({});
    const [user, setUser] = useLocalStorage('user', '');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${apiEndpoint}/api-login`, {
            email, password
        }).then(res => setResponse(res.data))
            .catch(err => setResponse(err));

        console.log('login')
    }

    useEffect(() => {

        if (response.status == 0) {
            error(response?.msg);
            return;
        }

        if (response?.user) {
            success(response?.msg);
            setUser(response.user);
            setTimeout(() => {
                window.location.reload();
            }, 2000)
            return;
        }

        error(response?.data?.msg);

    }, [response]);


    return <>
        {
            useRequireGuest(
                <div className="container">
                    {/* <Logo /> */}

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
            )
        }
    </>
}
