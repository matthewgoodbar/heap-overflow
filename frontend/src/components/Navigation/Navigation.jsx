import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';

const Navigation = props => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);

    const handleLogOut = e => {
        dispatch(sessionActions.logout());
    };

    let sessionLinks;
    if (currentUser) {
        sessionLinks = (
            <div>
                <p>Welcome, {currentUser.username}</p>
                <button onClick={handleLogOut}>Log Out</button>
            </div>
        );
    } else {
        sessionLinks = (
            <ul>
                <li><NavLink to='/login'>Log In</NavLink></li>
                <li><NavLink to='/signup'>Sign Up</NavLink></li>
            </ul>
        );
    }
    
    return (
        <>
            {/* <div id="color-accent"></div> */}
            <header>
                <div id="navigation">
                    <h1>Welcome to Heap Overflow!</h1>
                    {sessionLinks}
                </div>
            </header>
        </>
    );
};

export default Navigation;