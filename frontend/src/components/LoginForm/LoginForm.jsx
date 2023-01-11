import { useEffect, useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from "react-router-dom";

const LoginForm = props => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

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
        <div id="login-form-container">
            <div id="login-form">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
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
            {errors.length > 0 && 
                <>
                    <ul id="error-list">
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <br/>
                </>
            }
            <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
        </div>
    );
};

export default LoginForm;