import csrfFetch from "./csrf";

const ADD_QUESTION = 'questions/ADD_QUESTION';
const ADD_QUESTIONS = 'questions/ADD_QUESTIONS';
const REMOVE_QUESTION = 'questions/REMOVE_QUESTION';

export const addQuestion = (question) => ({
    type: ADD_QUESTION,
    question
});

export const addQuestions = (questions) => ({
    type: ADD_QUESTIONS,
    questions
});

export const removeQuestion = (questionId) => ({
    type: REMOVE_QUESTION,
    questionId
});

export const fetchQuestions = () => async dispatch => {
    const res = await csrfFetch('/api/questions');
    const data = await res.json();
    dispatch(addQuestions(data.questions));
};

export const fetchQuestion = (questionId) => async dispatch => {
    const res = await csrfFetch(`/api/questions/${questionId}`);
    const data = await res.json();
    dispatch(addQuestion(data.question));
};

export const createQuestion = (question) => async dispatch => {
    const res = await csrfFetch('/api/questions', {
        method: 'POST',
        body: JSON.stringify(question)
    });
    const data = await res.json();
    dispatch(addQuestion(data.question));
};

export const updateQuestion = (question) => async dispatch => {
    const res = await csrfFetch(`/api/questions/${question.id}`, {
        method: 'PATCH',
        body: JSON.stringify(question)
    });
    const data = await res.json();
    dispatch(addQuestion(data.question));
};

export const deleteQuestion = (questionId) => async dispatch => {
    const res = await csrfFetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
    });
    dispatch(removeQuestion(questionId));
};

const questionsReducer = (state = {}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case ADD_QUESTION:
            return { ...state, [action.question.id]: action.question };
        case ADD_QUESTIONS:
            return { ...state, ...action.questions };
        case REMOVE_QUESTION:
            delete newState[action.questionId];
            return newState;
        default: return state;
    }
};

export default questionsReducer;