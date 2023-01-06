import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import { createQuestion, fetchQuestion, updateQuestion } from "../../store/question";

const QuestionForm = props => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [headerText, setHeaderText] = useState("");
    const [buttonText, setButtonText] = useState("");
    const { questionId } = useParams();
    const currentUser = useSelector(state => state.session.currentUser);
    const question = useSelector(state => state.questions[questionId]);

    const handleSubmit = e => {
        e.preventDefault();
        const payload = { title, body, authorId: currentUser.id };
        if (questionId) {
            dispatch(updateQuestion(payload));
        } else {
            dispatch(createQuestion(payload));
        }
        history.push(`/questions/${questionId}`);
    };

    useEffect(() => {
        if (questionId) {
            setHeaderText("Edit your question");
            setButtonText("Edit Question");
            dispatch(fetchQuestion(questionId))
                .then(() => {
                    setTitle(question.title);
                    setBody(question.body);
                })
                .catch(() => {
                    history.push("/404");
                });
        } else {
            setHeaderText("Ask a new question");
            setButtonText("Ask Question");
        }
    }, [questionId]);

    if (!currentUser) return <Redirect to="/login" />
    if (currentUser && question && currentUser.id !== question.authorId) return <Redirect to="/questions" />
    
    return (
        <div id="question-form" className="component-with-sidebar">
            <h1>{headerText}</h1>
            <div id="question-form-container">
                <form onSubmit={handleSubmit}>
                    <label>Title <br/>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    </label> <br/>
                    <label>Body <br/>
                        <textarea cols="50" rows="10" value={body} onChange={e => setBody(e.target.value)}></textarea>
                    </label> <br/>
                    <button className="button-dark">{buttonText}</button>
                </form>
            </div>
        </div>
    );
};

export default QuestionForm;