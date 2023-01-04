import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../store/question";

const QuestionIndex = props => {

    const dispatch = useDispatch();
    const questions = useSelector(state => Object.values(state.questions));

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);
    
    return (
        <div id="question-index" className="component-standard">
            <h2>All Questions</h2>
            <ul>
                {questions &&
                questions.map((question) => <li key={question.id}>{question.title}</li>)}
            </ul>
        </div>
    );
};

export default QuestionIndex;