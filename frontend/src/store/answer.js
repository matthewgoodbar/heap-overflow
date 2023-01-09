import csrfFetch from "./csrf";

const ADD_ANSWER = 'answers/ADD_ANSWER';
const ADD_ANSWERS = 'answers/ADD_ANSWERS';
const REMOVE_ANSWER = 'answers/REMOVE_ANSWER';
const CLEAR_ANSWERS = 'answers/CLEAR_ANSWERS';

export const addAnswer = (answer) => ({
    type: ADD_ANSWER,
    answer
});

export const addAnswers = (answers) => ({
    type: ADD_ANSWERS,
    answers
});

export const removeAnswer = (answerId) => ({
    type: REMOVE_ANSWER,
    answerId
});

export const clearAnswers = () => ({
    type: CLEAR_ANSWERS
});

export const fetchAnswersToQuestion = (questionId) => async dispatch => {
    const res = await csrfFetch(`/api/answers/?question=${questionId}`);
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(addAnswers(data.answers));
    }
    return resClone;
};

export const fetchAnswersByAuthor = (authorId) => async dispatch => {
    const res = await csrfFetch(`/api/answers/?author=${authorId}`);
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(addAnswers(data.answers));
    }
    return resClone;
};

const answersReducer = (state = {}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case ADD_ANSWER:
            return { ...state, [action.answer.id]: action.answer };
        case ADD_ANSWERS:
            return { ...state, ...action.answers };
        case REMOVE_ANSWER:
            delete newState[action.answerId];
            return newState;
        case CLEAR_ANSWERS:
            return {};
        default: return state;
    }
};

export default answersReducer;