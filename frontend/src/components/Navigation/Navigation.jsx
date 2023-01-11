import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';

const Navigation = props => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);

    const handleLogOut = e => {
        dispatch(sessionActions.logout());
    };

    const handleDemoLogin = e => {
        dispatch(sessionActions.login({ credential: "demo", password: "password" }));
    };

    const handleSearch = e => {
        e.preventDefault();
    };

    let sessionLinks;
    if (currentUser) {
        sessionLinks = (
            <ul id="account-buttons">
                <li><a className="button-light">Account</a></li>
                {/* <button onClick={handleLogOut}>Log Out</button> */}
                <li><a className="button-dark" onClick={handleLogOut}>Log Out</a></li>
            </ul>
        );
    } else {
        sessionLinks = (
            <ul id="account-buttons">
                <li><a className="button-light" onClick={handleDemoLogin}>Demo Login</a></li>
                <li><NavLink to='/login' className="button-light">Log In</NavLink></li>
                <li><NavLink to='/signup' className="button-dark">Sign Up</NavLink></li>
            </ul>
        );
    }
    
    return (
        <>
            <header>
                <div id="navigation">
                    <NavLink to="/" id="logo" >
                        <img alt="logo-image" className="logo-image" />
                        heap<span id="logo-bold">overflow</span>
                    </NavLink>
                    <NavLink to="/about" id="about-button" className="button-small">About</NavLink>
                    <form id="search">
                        <input type="text" placeholder="Search" />
                    </form>
                    {sessionLinks}
                </div>
            </header>
        </>
    );
};

export default Navigation;