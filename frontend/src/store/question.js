import csrfFetch from "./csrf";
import { refreshQuestionCount } from "./questionCount";

const ADD_QUESTION = 'questions/ADD_QUESTION';
const ADD_QUESTIONS = 'questions/ADD_QUESTIONS';
const REMOVE_QUESTION = 'questions/REMOVE_QUESTION';
const CLEAR_QUESTIONS = 'questions/CLEAR_QUESTIONS';

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

export const clearQuestions = () => ({
    type: CLEAR_QUESTIONS
});

export const fetchQuestions = (pageNumber) => async dispatch => {
    pageNumber ||= 1;
    const res = await csrfFetch(`/api/questions/?page=${pageNumber}`);
    const data = await res.json();
    dispatch(addQuestions(data.questions));
    dispatch(refreshQuestionCount(data.questionCount));
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
        case CLEAR_QUESTIONS:
            return {};
        default: return state;
    }
};

export default questionsReducer;