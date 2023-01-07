import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import { createQuestion, fetchQuestion, updateQuestion } from "../../store/question";

const QuestionForm = props => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState([]);
    const [headerText, setHeaderText] = useState("");
    const [buttonText, setButtonText] = useState("");
    const { questionId } = useParams();
    const currentUser = useSelector(state => state.session.currentUser);
    const question = useSelector(state => state.questions[questionId]);

    const handleSubmit = e => {
        e.preventDefault();
        if (questionId) {
            let payload = { id: questionId, title, body, authorId: currentUser.id }
            dispatch(updateQuestion(payload))
                .then(() => {
                    history.push(`/questions/${questionId}`);
                })
                .catch(async res => {
                    let data = await res.json();
                    setErrors(data.errors);
                });
        } else {
            let payload = { title, body, authorId: currentUser.id };
            dispatch(createQuestion(payload))
                .then(async res => {
                    let data = await res.json();
                    history.push(`/questions/${data.question.id}`);
                })
                .catch(async res => {
                    let data = await res.json();
                    setErrors(data.errors);
                });
            
        }
    };

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    useEffect(() => {
        if (question) {
            setTitle(question.title);
            setBody(question.body);
        }
    }, [question]);

    useEffect(() => {
        if (questionId) {
            setHeaderText("Edit your question");
            setButtonText("Edit Question");
            dispatch(fetchQuestion(questionId))
                .catch(() => {
                    history.push(404);
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
            <div className="qa-form-container">
                <form onSubmit={handleSubmit}>
                    <label>Title <br/>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    </label> <br/>
                    <label>Body <br/>
                        <textarea cols="50" rows="10" value={body} onChange={e => setBody(e.target.value)}></textarea>
                    </label> <br/>
                    <button className="button-dark">{buttonText}</button>
                </form>
                <div className="qa-help-errors">
                    <div className="qa-help-errors-box help-color">
                        <p>Tips for a good question:</p>
                        <ul>
                            <li>The title should be a one-line summary of your problem</li>
                            <li>Give more specific details within the body</li>
                            <li>List what you've tried so far, and what the outcomes were</li>
                        </ul>
                    </div>
                    { (errors.length > 0) && 
                    <div className="qa-help-errors-box errors-color">
                        <p>Can't submit question:</p>
                        <ul>
                            {errors.map((er) => <li key={er}>{er}</li>)}
                        </ul>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;