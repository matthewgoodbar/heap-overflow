import { useSelector } from "react-redux";

const Splash = props => {

    const currentUser = useSelector(state => state.session.currentUser);
    
    return (
        <div id="splash">
            <h1>Welcome to Heap Overflow!</h1>
            <br/>
            <p>This is the sample splash page. Click 'Log In' to log in if you have an existing account, <br/>
                or 'Sign Up' if you don't have an account yet.
            </p>
            {currentUser &&
            <p>You are currently logged in as: {currentUser.username}</p>
            }
        </div>
    );
};

export default Splash;