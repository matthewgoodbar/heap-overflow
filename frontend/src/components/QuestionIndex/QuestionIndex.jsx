import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useQueryParam, NumberParam } from "use-query-params";
import { clearQuestions, fetchQuestions } from "../../store/question";
import QuestionPreview from "../QuestionPreview/";

const QuestionIndex = props => {

    const dispatch = useDispatch();
    const questions = useSelector(state => Object.values(state.questions).reverse());
    const [page, setPage] = useQueryParam('page', NumberParam);
    console.log(page);
    
    useEffect(() => {
        dispatch(clearQuestions());
        dispatch(fetchQuestions(page));
    }, []);

    if (!page) return <Redirect to="/questions?page=1"/>
    
    return (
        <div id="question-index" className="component-standard">
            <h2>All Questions</h2>
            <ul>
                {questions &&
                questions.map((question) => <QuestionPreview key={question.id} question={question} />)}
            </ul>
        </div>
    );
};

export default QuestionIndex;