import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Splash = props => {
    const currentUser = useSelector(state => state.session.currentUser);
    
    return (
        <div id="splash" className="component-standard">
            <h1>Welcome to Heap Overflow!</h1>
            <br/>
            <p>This is the sample splash page. Click 'Log In' to log in if you have an existing account, <br/>
                or 'Sign Up' if you don't have an account yet.
            </p>
            {currentUser &&
            <p>You are currently logged in as: {currentUser.username}</p>
            }
            <NavLink to="/questions">Click here to view questions</NavLink>
        </div>
    );
};

export default Splash;