import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fullTimestamp } from "../../dateUtil";
import { clearAnswers, fetchAnswersToQuestion } from "../../store/answer";
import { deleteQuestion, fetchQuestion } from "../../store/question";
import Answer from "../Answer";
import AnswerForm from "../AnswerForm";

const Question = props => {

    const dispatch = useDispatch();
    const { questionId } = useParams();
    const history = useHistory();
    const [timestamp, setTimestamp] = useState("");
    const question = useSelector(state => state.questions[questionId]);
    const currentUser = useSelector(state => state.session.currentUser);
    const answers = useSelector(state => Object.values(state.answers).sort((a, b) => b.voteSum - a.voteSum));

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    
    useEffect(() => {
        dispatch(fetchQuestion(questionId))
            .catch(() => {
                history.push("/404");
            });
        dispatch(clearAnswers());
        dispatch(fetchAnswersToQuestion(questionId));
    }, [questionId]);

    useEffect(() => {
        if (question) {
            setTimestamp(fullTimestamp(question));
        }
    }, [question]);

    const handleDelete = e => {
        dispatch(deleteQuestion(questionId));
        history.push("/questions");
    };

    if (!question) return <div id="question-show" className="component-with-sidebar"></div>
    
    const authorLoggedIn = (currentUser) ? question.authorId === currentUser.id : false;
    
    return (
        <div id="question-show" className="component-with-sidebar">
            <div id="question-header">
                <div>
                    <span id="question-title">
                        <h1>{question.title}</h1>
                    </span>
                    { (authorLoggedIn) &&
                    <div id="edit-delete-buttons">
                        <Link to={`/questions/${questionId}/edit`} className="button-small">Edit this question</Link>
                        <p onClick={handleDelete} className="button-small">Delete this question</p>
                    </div>
                    }
                    <p className="timestamp">Asked at {timestamp}</p>
                </div>
                <Link to="/questions/new" className="button-dark">Ask a Question</Link>
            </div>
            <div id="question-body">
                <p>{question.body}
                { (authorLoggedIn) &&
                <Link to={`/questions/${questionId}/edit`} className="button-small">Edit</Link>}</p>
                <div className="author-plaque-container">
                    <Link to={`/users/${question.authorId}`} className="author-plaque">
                        <p>Asked by {question.author.username}</p>
                    </Link>
                </div>
            </div>
            <div id="answers-header">
                { (answers.length > 0) && 
                <h2>{answers.length} Answers</h2>
                }
                { (!answers.length) &&
                <>
                    <h2>No answers yet</h2>
                    <p>Be the first to lend a hand!</p>
                </>
                }
            </div>
            { (answers.length > 0) &&
            <div id="answer-list">
                {answers.map(answer => <Answer key={answer.id} answer={answer}></Answer>)}
            </div>
            }
            <div id="your-answer">
                <h2>Your Answer</h2>
                { (currentUser) &&
                <AnswerForm />
                }
                { (!currentUser) &&
                <p><Link to='/login'>Log in</Link> or <Link to='/signup'>sign up</Link> to answer a question</p>
                }
            </div>
        </div>
    );
};

export default Question;