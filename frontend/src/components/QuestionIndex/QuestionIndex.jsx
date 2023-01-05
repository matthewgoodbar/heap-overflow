import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useQueryParam, NumberParam } from "use-query-params";
import { clearQuestions, fetchQuestions } from "../../store/question";
import { showSidebar } from "../../store/sidebar";
import QuestionPreview from "../QuestionPreview/";

const QuestionIndex = props => {

    const dispatch = useDispatch();
    const questions = useSelector(state => Object.values(state.questions).reverse());
    const [page, setPage] = useQueryParam('page', NumberParam);

    useEffect(() => {dispatch(showSidebar())}, []);
    
    useEffect(() => {
        dispatch(clearQuestions());
        dispatch(fetchQuestions(page));
    }, [page]);

    if (!page) return <Redirect to="/questions?page=1"/>
    
    return (
        <div id="question-index" className="component-with-sidebar">
            <h2>All Questions</h2>
            <ul>
                {questions &&
                questions.map((question) => <QuestionPreview key={question.id} question={question} />)}
            </ul>
            <div>
                {(page !== 1) &&
                <button onClick={e => setPage(num => num-1)}>Prev</button>
                }
                <button onClick={e => setPage(num => num+1)}>Next</button>
            </div>
        </div>
    );
};

export default QuestionIndex;