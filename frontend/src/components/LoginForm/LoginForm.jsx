import { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

const LoginForm = props => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (currentUser) return <Redirect to="/" />

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data && data["errors"]) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
            });
        
    };

    return (
        <div id="login-form">
        <form onSubmit={handleSubmit}>
            {errors.length > 0 && 
            <>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <br/>
            </>
            }
            <label>Username or Email <br/>
                <input 
                type="text" 
                value={credential} 
                onChange={e => setCredential(e.target.value)} 
                required />
            </label>
            <br/>
            <label>Password <br/>
                <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required />
            </label>
            <br/>
            <button type="submit">Log In</button>
        </form>
        </div>
    );
};

export default LoginForm;