import csrfFetch, { storeCSRFToken } from './csrf';

const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    user
});

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
});

export const login = (user) => async dispatch => {
    const { credential, password } = user;
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
};

export const signup = (user) => async dispatch => {
    const { email, username, password } = user;
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email,
            username,
            password
        })
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
};

export const logout = () => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return res;
};

export const restoreSession = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
};

const initialState = { currentUser: JSON.parse(sessionStorage.getItem('currentUser')) };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, currentUser: action.user };
        case REMOVE_CURRENT_USER:
            return { ...state, currentUser: null };
        default: return state;
    }
};

export default sessionReducer;

const storeCurrentUser = (user) => {
    if (user) sessionStorage.setItem('currentUser', JSON.stringify(user));
    else sessionStorage.removeItem('currentUser');
};