import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = props => {

    // const visible = useSelector(state => state.sidebar.show);
    
    // if (!visible) return <></>
    
    return (
        <div id="sidebar">
            <NavLink exact to="/" activeClassName="sidebar-selected">Home</NavLink>
            <NavLink exact to="/questions" activeClassName="sidebar-selected">Questions</NavLink>
            <NavLink exact to="/users" activeClassName="sidebar-selected">Users</NavLink>
        </div>
    );
};

export default Sidebar;