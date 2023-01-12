
const REFRESH_USER_COUNT = 'users/REFRESH_USER_COUNT';

export const refreshUserCount = (count) => ({
    type: REFRESH_USER_COUNT,
    count
});

const userCountReducer = (state = {}, action) => {
    switch (action.type) {
        case REFRESH_USER_COUNT:
            return { count: action.count };
        default: return state;
    }
};

export default userCountReducer;