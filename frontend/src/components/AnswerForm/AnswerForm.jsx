import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { createAnswer, updateAnswer } from "../../store/answer";

const AnswerForm = ({ answer, toggleCallback }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const { questionId } = useParams();
    const [body, setBody] = useState("");
    const [buttonText, setButtonText] = useState("Submit Answer")
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (answer) {
            setBody(answer.body);
            setButtonText("Edit Answer");
        }
    }, [answer]);

    const handleSubmit = e => {
        e.preventDefault();
        if (answer) {
            let payload = { body, id: answer.id };
            dispatch(updateAnswer(payload))
                .then(() => {
                    setErrors([]);
                    toggleCallback(prev => !prev);
                })
                .catch(async res => {
                    let data = await res.json();
                    setErrors(data.errors);
                });
        } else {
            let payload = { body, authorId: currentUser.id, questionId };
            dispatch(createAnswer(payload))
                .then(() => {
                    setErrors([]);
                    setBody("");
                })
                .catch(async res => {
                    let data = await res.json();
                    setErrors(data.errors);
                });
        }
    };
    
    return (
        <div id="answer-form">
            <div className="qa-form-container">
                <form onSubmit={handleSubmit}>
                    <label>Body <br/>
                        <textarea value={body} onChange={e => setBody(e.target.value)} cols="50" rows="10"></textarea> <br/>
                    </label>
                    <button className="button-dark">{buttonText}</button>
                </form>
                <div className="qa-help-errors">
                    <div className="qa-help-errors-box help-color">
                        <ul>
                            <p>Tips for a good answer:</p>
                            <li>Be sure to answer the question</li>
                            <li>Provide details, show your research</li>
                            <li>Avoid making opinionated statements</li>
                        </ul>
                    </div>
                    { (errors.length > 0) && 
                    <div className="qa-help-errors-box errors-color">
                        <p>Can't submit answer:</p>
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

export default AnswerForm;