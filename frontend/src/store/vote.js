import { fetchAnswer } from "./answer";
import csrfFetch from "./csrf";

export const createVote = (vote) => async dispatch => {
    const res = await csrfFetch('/api/votes', {
        method: 'POST',
        body: JSON.stringify(vote)
    });
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(fetchAnswer(data.answer.id));
    }
    return resClone;
};

export const updateVote = (vote) => async dispatch => {
    const res = await csrfFetch(`/api/votes/${vote.id}`, {
        method: 'PATCH',
        body: JSON.stringify(vote)
    });
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(fetchAnswer(data.answer.id));
    }
    return resClone;
};

export const deleteVote = (voteId) => async dispatch => {
    const res = await csrfFetch(`/api/votes/${voteId}`, {
        method: 'DELETE'
    });
    const resClone = res.clone();
    if (res.ok) {
        const data = await res.json();
        dispatch(fetchAnswer(data.answer.id));
    }
    return resClone;
};