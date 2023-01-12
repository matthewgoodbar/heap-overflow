import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = props => {

    // const visible = useSelector(state => state.sidebar.show);
    
    // if (!visible) return <></>
    
    return (
        <div id="sidebar">
            <div className="sidebar-link-container">
                <NavLink exact to="/" className="sidebar-link">Home</NavLink>
                <NavLink to="/questions" activeClassName="sidebar-selected" className="sidebar-link">Questions</NavLink>
                <NavLink exact to="/users" activeClassName="sidebar-selected" className="sidebar-link">Users</NavLink>
            </div>
        </div>
    );
};

export default Sidebar;