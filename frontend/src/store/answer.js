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

export const fetchAnswer = (answerId) => async dispatch => {
    const res = await csrfFetch(`/api/answers/${answerId}`);
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(addAnswer(data.answer));
    }
    return resClone;
};

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

export const createAnswer = (answer) => async dispatch => {
    const res = await csrfFetch('/api/answers', {
        method: 'POST',
        body: JSON.stringify(answer)
    });
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(addAnswer(data.answer));
    }
    return resClone;
};

export const updateAnswer = (answer) => async dispatch => {
    const res = await csrfFetch(`/api/answers/${answer.id}`, {
        method: 'PATCH',
        body: JSON.stringify(answer)
    });
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(addAnswer(data.answer));
    }
    return resClone;
};

export const deleteAnswer = (answerId) => async dispatch => {
    const res = await csrfFetch(`/api/answers/${answerId}`, {
        method: 'DELETE'
    });
    const resClone = res.clone();
    if (res.ok) {
        dispatch(removeAnswer(answerId));
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