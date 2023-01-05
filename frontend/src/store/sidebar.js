
const SHOW_SIDEBAR = 'sidebar/SHOW_SIDEBAR';
const HIDE_SIDEBAR = 'sidebar/HIDE_SIDEBAR';

export const showSidebar = () => ({
    type: SHOW_SIDEBAR
});

export const hideSidebar = () => ({
    type: HIDE_SIDEBAR
});

const initialState = { show: false }

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SIDEBAR:
            return { show: true };
        case HIDE_SIDEBAR:
            return { show: false };
        default: return state;
    }
};

export default sidebarReducer;