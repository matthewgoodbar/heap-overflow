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
    const [timestamp, setTimestamp] = useState("");
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (answer) {
            setTimestamp(fullTimestamp(answer));
        }
    }, [answer]);

    const handleDelete = e => {
        dispatch(deleteAnswer(answer.id));
    };

    const toggleEdit = e => {
        setEdit(prev => !prev);
    };

    const handleUpvote = e => {
        if (answer.votes[currentUser.id]?.voteType === "down") {
            dispatch(updateVote({
                id: answer.votes[currentUser.id].id,
                voteType: "up"
            }));
        } else if (answer.votes[currentUser.id]) {
            dispatch(deleteVote(answer.votes[currentUser.id].id));
        } else {
            dispatch(createVote({
                answerId: answer.id,
                voterId: currentUser.id,
                voteType: "up"
            }));
        }
    };

    const handleDownvote = e => {
        if (answer.votes[currentUser.id]?.voteType === "up") {
            dispatch(updateVote({
                id: answer.votes[currentUser.id].id,
                voteType: "down"
            }));
        } else if (answer.votes[currentUser.id]) {
            dispatch(deleteVote(answer.votes[currentUser.id].id));
        } else {
            dispatch(createVote({
                answerId: answer.id,
                voterId: currentUser.id,
                voteType: "down"
            }));
        }
    };

    if (!answer) return <div className="answer"></div>

    const authorLoggedIn = (currentUser) ? answer.authorId === currentUser.id : false;
    
    return (
        <>
            { (!edit) &&
            <div className="answer">
                <div className="vote-gui">
                    <button className="upvote-button" onClick={handleUpvote}>up</button>
                    <p>{answer.voteSum}</p>
                    <button className="downvote-button" onClick={handleDownvote}>down</button>
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
            <div className="answer">
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