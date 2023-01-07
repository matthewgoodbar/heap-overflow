import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { deleteQuestion, fetchQuestion } from "../../store/question";
import AnswerForm from "../AnswerForm";

const Question = props => {

    const dispatch = useDispatch();
    const { questionId } = useParams();
    const history = useHistory();
    const question = useSelector(state => state.questions[questionId]);
    const currentUser = useSelector(state => state.session.currentUser);
    const answers = useSelector(state => state.answers);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    
    useEffect(() => {
        dispatch(fetchQuestion(questionId))
            .catch(() => {
                history.push("/404");
            });
    }, [questionId]);

    const handleDelete = e => {
        dispatch(deleteQuestion(questionId));
        history.push("/questions");
    };

    // if (!questionId) return <Redirect to="/404" />

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
                    <p>Asked {question.createdAt.split("T")[0]} Modified {question.updatedAt.split("T")[0]}</p>
                </div>
                <Link to="/questions/new" className="button-dark">Ask a Question</Link>
            </div>
            <div id="question-body">
                <p>{question.body}
                { (authorLoggedIn) &&
                <Link to={`/questions/${questionId}/edit`} className="button-small">Edit</Link>}</p>
                <div id="author-plaque-container">
                    <Link to={`/users/${question.authorId}`} className="author-plaque">
                        <p>Asked by {question.author.username}</p>
                    </Link>
                </div>
            </div>
            <div id="answers-header">
                { (answers) && 
                <h2>{answers.length} Answers</h2>
                }
                { (!answers) &&
                <>
                    <h2>No answers yet</h2>
                    <p>Be the first to lend a hand!</p>
                </>
                }
            </div>
            { (answers) &&
            <div id="answer-list">

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