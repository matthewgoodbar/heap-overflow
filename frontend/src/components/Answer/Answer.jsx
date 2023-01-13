import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fullTimestamp } from "../../dateUtil";
import { deleteAnswer } from "../../store/answer";
import { createVote, deleteVote, updateVote } from "../../store/vote";
import AnswerForm from "../AnswerForm";

const Answer = ({ answer }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const [upvoteButtonSubclass, setUpvoteButtonSubclass] = useState("upvote-inactive");
    const [downvoteButtonSubclass, setDownvoteButtonSubclass] = useState("downvote-inactive");
    const [timestamp, setTimestamp] = useState("");
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (answer) {
            setTimestamp(fullTimestamp(answer));
        }
    }, [answer]);

    useEffect(() => {
        if (currentUser) {
            let vote;
            if (answer.votes) {
                vote = answer.votes[currentUser.id];
            }
            if (vote) {
                if (vote.voteType === "up") {
                    upvoteIcons();
                } else {
                    downvoteIcons();
                }
            } else {
                noVoteIcons();
            }
        } else {
            disableVoteIcons();
        }
    }, [currentUser]);

    const handleDelete = e => {
        dispatch(deleteAnswer(answer.id));
    };

    const toggleEdit = e => {
        setEdit(prev => !prev);
    };

    const upvoteIcons = () => {
        setUpvoteButtonSubclass("upvote-active");
        setDownvoteButtonSubclass("downvote-inactive");
    };

    const downvoteIcons = () => {
        setUpvoteButtonSubclass("upvote-inactive");
        setDownvoteButtonSubclass("downvote-active");
    };

    const noVoteIcons = () => {
        setUpvoteButtonSubclass("upvote-inactive");
        setDownvoteButtonSubclass("downvote-inactive");
    };

    const disableVoteIcons = () => {
        setUpvoteButtonSubclass("upvote-disabled");
        setDownvoteButtonSubclass("downvote-disabled");
    };

    const handleUpvote = e => {
        if (answer.votes){
            if (answer.votes[currentUser.id]?.voteType === "down") {
                dispatch(updateVote({
                    id: answer.votes[currentUser.id].id,
                    voteType: "up"
                }))
                    .then(upvoteIcons);
            } else if (answer.votes[currentUser.id]) {
                dispatch(deleteVote(answer.votes[currentUser.id].id))
                    .then(noVoteIcons);
            } else {
                dispatch(createVote({
                    answerId: answer.id,
                    voterId: currentUser.id,
                    voteType: "up"
                }))
                    .then(upvoteIcons);
            }
        } else {
            dispatch(createVote({
                answerId: answer.id,
                voterId: currentUser.id,
                voteType: "up"
            }))
                .then(upvoteIcons);
        }
    };

    const handleDownvote = e => {
        if (answer.votes) {
            if (answer.votes[currentUser.id]?.voteType === "up") {
                dispatch(updateVote({
                    id: answer.votes[currentUser.id].id,
                    voteType: "down"
                }))
                    .then(downvoteIcons);
            } else if (answer.votes[currentUser.id]) {
                dispatch(deleteVote(answer.votes[currentUser.id].id))
                    .then(noVoteIcons);
            } else {
                dispatch(createVote({
                    answerId: answer.id,
                    voterId: currentUser.id,
                    voteType: "down"
                }))
                    .then(downvoteIcons);
            }
        } else {
            dispatch(createVote({
                answerId: answer.id,
                voterId: currentUser.id,
                voteType: "down"
            }))
                .then(downvoteIcons);
        }
    };

    if (!answer) return <div className="answer"></div>

    const authorLoggedIn = (currentUser) ? answer.authorId === currentUser.id : false;
    
    return (
        <>
            { (!edit) &&
            <div className="answer answer-display-mode">
                <div className="vote-gui">
                    { (currentUser) &&
                    <img alt="upvote-button" className={`vote-button ${upvoteButtonSubclass}`} onClick={handleUpvote} />
                    }
                    { (!currentUser) &&
                    <img alt="upvote-button" className={`vote-button ${upvoteButtonSubclass}`} />
                    }
                    <p>{answer.voteSum}</p>
                    { (currentUser) &&
                    <img alt="downvote-button" className={`vote-button ${downvoteButtonSubclass}`} onClick={handleDownvote} />
                    }
                    { (!currentUser) &&
                    <img alt="downvote-button" className={`vote-button ${downvoteButtonSubclass}`} />
                    }
                </div>
                <div className="answer-content">
                    <p>{answer.body}</p>
                    { (authorLoggedIn) &&
                    <div id="edit-delete-buttons">
                        <p onClick={toggleEdit} className="button-small">Edit this answer</p>
                        <p onClick={handleDelete} className="button-small">Delete this answer</p>
                    </div>
                    }
                    <p className="timestamp">Answered at {timestamp}</p>
                    <div className="author-plaque-container">
                            <Link to={`/users/${answer.authorId}`} className="author-plaque">
                                <p>Answered by {answer.author.username}</p>
                            </Link>
                    </div>
                </div>
            </div>
            }
            { (edit) &&
            <div className="answer answer-edit-mode">
                <div id="answer-edit-header">
                    <h3>Edit your answer</h3>
                    <p onClick={toggleEdit} className="button-small">Cancel</p>
                </div>
                <AnswerForm answer={answer} toggleCallback={toggleEdit} />
            </div>
            }
        </>
    );
};

export default Answer;