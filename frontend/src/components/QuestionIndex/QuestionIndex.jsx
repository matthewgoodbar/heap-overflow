import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { fetchQuestions } from "../../store/question";

const QuestionIndex = props => {

    const dispatch = useDispatch();
    const questions = useSelector(state => Object.values(state.questions));
    const { page } = useParams();
    console.log(page);
    
    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);

    // if (!page) return <Redirect to="/questions?page=1"/>
    
    // if (page) 
    return (
        <div id="question-index" className="component-standard">
            <h2>All Questions</h2>
            <ul>
                {questions &&
                questions.map((question) => <li key={question.id}>{question.title}</li>)}
            </ul>
        </div>
    );
    // else return <Redirect to="/questions?page=1"/>;
};

export default QuestionIndex;