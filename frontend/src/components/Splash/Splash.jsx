import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Splash = props => {
    
    const currentUser = useSelector(state => state.session.currentUser);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    
    return (
        <div id="splash" className="component-standard">
            <h1 className="splash-header">Welcome to Heap Overflow!</h1>
            <br/>
            <p className="splash-text">This is a forum where you can ask questions and<br/>
                receive answers from dozens of users across the globe.<br/>
            </p>
            <br/>
            <p className="splash-text splash-bold">Have a burning question?</p>
            <p className="splash-text">
                Type your query into the search bar at the top to see if<br/>
                anyone else has been in your shoes before.
            </p>
            <br/>
            <p className="splash-text splash-bold">No one has asked your question yet?</p>
            <p className="splash-text">Feel free to <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to
                ask your <br/>
                incredibly unique question.
            </p>
            <br/>
            <p className="splash-text splash-bold">Waiting for the answers to come rolling in?</p>
            <p className="splash-text">Spend some time browsing other user's questions!<br/>
                You might just make someone's day,<br/>
                it's the least you can do!    
            </p>
            <br/>
            <br/>
            {/* {currentUser &&
            <>
                <p className="splash-text">You are currently logged in as: {currentUser.username}</p>
                <br/>
            </>
            } */}
            <Link to="/questions" className="button-dark splash-button">Browse all questions</Link>
        </div>
    );
};

export default Splash;