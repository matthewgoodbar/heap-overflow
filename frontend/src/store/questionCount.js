
const REFRESH_QUESTION_COUNT = 'questions/REFRESH_QUESTION_COUNT';

export const refreshQuestionCount = (count) => ({
    type: REFRESH_QUESTION_COUNT,
    count
});

const questionCountReducer = (state = {}, action) => {
    switch (action.type) {
        case REFRESH_QUESTION_COUNT:
            return { count: action.count };
        default: return state;
    }
};

export default questionCountReducer;