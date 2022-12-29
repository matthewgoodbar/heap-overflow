import csrfFetch from './csrf';

const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    user
});

const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
});

export const login = (user) => async dispatch => {
    const { credential, password } = user;
    const res = await csrfFetch('api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await res.json();
    dispatch(setCurrentUser(data.user));
    return res;
};

const initialState = { currentUser: null };

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