import csrfFetch from "./csrf";

const ADD_USER = 'users/ADD_USER';
const ADD_USERS = 'users/ADD_USERS';
const CLEAR_USERS = 'users/CLEAR_USERS';

export const addUser = (user) => ({
    type: ADD_USER,
    user
});

export const addUsers = (users) => ({
    type: ADD_USERS,
    users
});

export const clearUsers = () => ({
    type: CLEAR_USERS,
});

export const fetchUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(addUser(data.user));
    }
    return resClone;
};

export const fetchUsers = ({ page, search }) => async dispatch => {
    let res;
    if (search) {
        res = await csrfFetch(`/api/users/?search=${search}&page=${page}`);
    } else {
        res = await csrfFetch(`/api/users/?page=${page}`);
    }
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(addUsers(data.users));
    }
    return resClone;
};

const usersReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_USER:
            return { ...state, [action.user.id]: action.user };
        case ADD_USERS:
            return { ...state, ...action.users };
        case CLEAR_USERS:
            return {};
        default: return state;
    }
}

export default usersReducer;