import { useSelector } from "react-redux";

const Sidebar = props => {

    const visible = useSelector(state => state.sidebar.show);
    
    if (!visible) return <></>
    
    return (
        <div id="sidebar">
            This is the sidebar
        </div>
    );
};

export default Sidebar;