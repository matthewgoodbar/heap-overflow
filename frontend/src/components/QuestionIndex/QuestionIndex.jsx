import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { useQueryParam, NumberParam, StringParam } from "use-query-params";
import { clearQuestions, fetchQuestions } from "../../store/question";
import QuestionPreview from "../QuestionPreview/";

const QuestionIndex = props => {

    const dispatch = useDispatch();
    const history = useHistory();
    const questions = useSelector(state => Object.values(state.questions).reverse());
    const questionCount = useSelector(state => state.questionCount.count);
    const [page, setPage] = useQueryParam('page', NumberParam);
    const [search, setSearch] = useQueryParam('search', StringParam);

    useEffect(() => {
        window.scrollTo(0,0);
        dispatch(clearQuestions());
        dispatch(fetchQuestions({ page, search }))
            .catch(() => {
                history.push("/404");
            });
    }, [page, search]);

    if (questionCount) {
        const pageOutOfBounds = (questionCount < (page - 1) * 10 || page < 1);
        if (pageOutOfBounds) return <Redirect to="/404" />
    }

    if (!page) return <Redirect to="/questions?page=1"/>
    
    return (
        <div id="question-index" className="component-with-sidebar">
            <div id="question-index-header">
                <div>
                    <h1>All Questions</h1>
                    <p>{questionCount} questions asked so far</p>
                </div>
                <NavLink to="/questions/new" className="button-dark">Ask a Question</NavLink>
            </div>
            <ul id="question-list">
                {questions &&
                questions.map((question) => <QuestionPreview key={question.id} question={question} />)}
            </ul>
            <div className="page-buttons">
                { (page !== 1) &&
                <div onClick={e => setPage(num => num-1)} className="button-light">Prev</div>
                }
                { (questionCount > page * 10) &&
                <div onClick={e => setPage(num => num+1)} className="button-light">Next</div>
                }
            </div>
        </div>
    );
};

export default QuestionIndex;