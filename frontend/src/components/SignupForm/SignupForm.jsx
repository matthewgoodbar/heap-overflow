import { useEffect, useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect } from "react-router-dom";

const SignupForm = props => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    if (currentUser) return <Redirect to="/" />

    const handleSubmit = e => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    let data;
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                });
        }
        return setErrors(['Passwords must be the same in both fields']);
    };
    
    return (
        <div id="signup-form-container">
            <div id="signup-form">
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <label>Username <br/>
                        <input 
                        type="text" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        required />
                    </label>
                    <br/>
                    <label>Email <br/>
                        <input 
                        type="text" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
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
                    <label>Confirm Password <br/>
                        <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        required />
                    </label>
                    <br/>
                    <button type="submit" className="button-dark login-signup-button">Sign Up</button>
                </form>
                <div className="qa-help-errors">
                    <div className="signup-help-errors-box help-color">
                        <ul>
                            <li>Username must be more than 3 characters</li>
                            <li>Must supply a valid email</li>
                            <li>Password must be more than 6 characters</li>
                        </ul>
                    </div>
                    {errors.length > 0 && 
                    <div className="signup-help-errors-box errors-color">
                        <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                    </div>
                    }
                </div>
            </div>
            <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
        </div>
    );
};

export default SignupForm;