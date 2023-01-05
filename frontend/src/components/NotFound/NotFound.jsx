import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { showSidebar } from "../../store/sidebar";

const NotFound = props => {

    const dispatch = useDispatch();

    useEffect(() => {dispatch(showSidebar())}, []);
    
    return (
        <div id="not-found" className="component-with-sidebar">
            <h2 id="big-404">404 Page not found</h2>
            <NavLink to="/" className="button-light">Back to home page</NavLink>
        </div>
    );
};

export default NotFound;