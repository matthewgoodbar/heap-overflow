import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchQuestion } from "../../store/question";

const Question = props => {

    const dispatch = useDispatch();
    const { questionId } = useParams();
    const question = useSelector(state => state.questions[questionId]);
    const currentUser = useSelector(state => state.session.currentUser);

    useEffect(() => {
        dispatch(fetchQuestion(questionId));
    }, [questionId]);

    if (!questionId) return <Redirect to="/404" />

    if (!question) return <div id="question-show" className="component-with-sidebar"></div>
    
    const authorLoggedIn = (currentUser) ? question.authorId === currentUser.id : false;
    
    return (
        <div id="question-show" className="component-with-sidebar">
            <div id="question-header">
                <div>
                    <span id="question-title">
                        <h1>{question.title}
                        { (authorLoggedIn) &&
                        <Link to={`/questions/${questionId}/edit`} className="button-small">Edit</Link>}</h1>
                    </span>
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
                <h2>Answers</h2>
            </div>
        </div>
    );
};

export default Question;