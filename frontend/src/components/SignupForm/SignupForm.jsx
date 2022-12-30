import { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

const SignupForm = props => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

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
        <>
        <form onSubmit={handleSubmit}>
            {errors.length > 0 && 
            <>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <br/>
            </>
            }
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
            <button type="submit">Sign Up</button>
        </form>
        </>
    );
};

export default SignupForm;