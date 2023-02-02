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
                <form onSubmit={handleSubmit}>
                    <h2>Log In</h2>
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
                    <button type="submit" className="button-dark login-signup-button">Log In</button>
                </form>
                {errors.length > 0 && 
                    <div className="login-help-errors-box errors-color">
                        <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                    </div>
                }
            </div>
            <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
        </div>
    );
};

export default LoginForm;