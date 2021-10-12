import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiEndpoint } from '../helpers/config';
import useLocalStorage from '../hooks/useLocalStorage';
import usePageLoader from '../hooks/usePageLoader';
import useRequireGuest from '../hooks/useRequireGuest';

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
        if (response?.data?.msg) {
            alert(response.data.msg);
        }

        if (response?.data?.user) {
            setUser(response?.data?.user);
            window.location.reload();
        }

        console.log(response)
    }, [response]);

    const [loading, setLoading, loaded] = usePageLoader({
        main: <>
            <div className="col-md-6">
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
                </form>
            </div>
        </>,
        initial: true
    })

    return <>{useRequireGuest(loaded)}</>
}