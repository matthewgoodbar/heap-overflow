import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const NotFound = props => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    
    return (
        <div id="not-found" className="component-with-sidebar">
            <h2 id="big-404">404 Page not found</h2>
            <NavLink to="/" className="button-light">Back to home page</NavLink>
        </div>
    );
};

export default NotFound;