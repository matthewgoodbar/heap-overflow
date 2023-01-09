import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAnswer } from "../../store/answer";
import AnswerForm from "../AnswerForm";

const Answer = ({ answer }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const [edit, setEdit] = useState(false);

    const handleDelete = e => {
        dispatch(deleteAnswer(answer.id));
    };

    const toggleEdit = e => {
        setEdit(prev => !prev);
    }

    if (!answer) return <div className="answer"></div>

    const authorLoggedIn = (currentUser) ? answer.authorId === currentUser.id : false;
    
    return (
        <>
            { (!edit) &&
            <div className="answer">
                <p>{answer.body}</p>
                { (authorLoggedIn) &&
                <div id="edit-delete-buttons">
                    <p onClick={toggleEdit} className="button-small">Edit this answer</p>
                    <p onClick={handleDelete} className="button-small">Delete this answer</p>
                </div>
                }
                <div className="author-plaque-container">
                        <Link to={`/users/${answer.authorId}`} className="author-plaque">
                            <p>Answered by {answer.author.username}</p>
                        </Link>
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