import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = props => {
    
    return (
        <div id="sidebar">
            <div className="sidebar-link-container">
                <NavLink exact to="/" className="sidebar-link">Home</NavLink>
                <NavLink to="/questions" activeClassName="sidebar-selected" className="sidebar-link">Questions</NavLink>
                <NavLink to="/users" activeClassName="sidebar-selected" className="sidebar-link">Users</NavLink>
                <div className="sidebar-logo-links">
                    <a href="https://www.linkedin.com/in/matthew-goodbar-671a24169/"><img className="linkedin-image-gray" alt="linkedin logo" /></a>
                    <a href="https://github.com/matthewgoodbar"><img className="github-image-gray" alt="github logo" /></a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;