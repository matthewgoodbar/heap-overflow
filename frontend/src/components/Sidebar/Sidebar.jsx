import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = props => {
    
    return (
        <div id="sidebar">
            <div className="sidebar-link-container">
                <NavLink exact to="/" className="sidebar-link">Home</NavLink>
                <NavLink to="/questions" activeClassName="sidebar-selected" className="sidebar-link">Questions</NavLink>
                <NavLink to="/users" activeClassName="sidebar-selected" className="sidebar-link">Users</NavLink>
                <div className="sidebar-projects">
                    <p className="sidebar-text">My other projects</p>
                    <a href="https://matthewgoodbar.github.io/js-game" className="sidebar-text" target="_blank">CATACOMB</a>
                    <p className="sidebar-text">
                        An action survival browser game made in vanilla JavaScript
                    </p>
                    <a href="https://friend-ly.onrender.com" className="sidebar-text" target="_blank">Friend.ly</a>
                    <p className="sidebar-text">
                        A group project chat app made using the MERN stack
                    </p>
                </div>
                <div className="sidebar-logo-links">
                    <a href="https://www.linkedin.com/in/matthew-goodbar-671a24169/" target="_blank"><img className="linkedin-image-gray" alt="linkedin logo" /></a>
                    <a href="https://github.com/matthewgoodbar/heap-overflow" target="_blank"><img className="github-image-gray" alt="github logo" /></a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;