import { NavLink } from "react-router-dom";

const NotFound = props => {
    
    return (
        <div id="not-found" className="component-with-sidebar">
            <h2 id="big-404">404 Page not found</h2>
            <NavLink to="/" className="button-light">Back to home page</NavLink>
        </div>
    );
};

export default NotFound;