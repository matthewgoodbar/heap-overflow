import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { useQueryParam, NumberParam, StringParam } from "use-query-params";
import { clearQuestions, fetchQuestions } from "../../store/question";
import QuestionPreview from "../QuestionPreview/";

const QuestionIndex = props => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [pageHeader, setPageHeader] = useState("All Questions");
    const [subtitle, setSubtitle] = useState(" questions asked so far");
    const [page, setPage] = useQueryParam('page', NumberParam);
    const [search, setSearch] = useQueryParam('search', StringParam);
    const [order, setOrder] = useState("NEWEST");
    const questionCount = useSelector(state => state.questionCount.count);
    const orderQuestions = (questionArray) => {
        if (questionArray) {
            switch (order) {
                case "NEWEST":
                    return questionArray.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
                case "OLDEST":
                    return questionArray.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
                case "MOST_ANSWERED":
                    return questionArray.sort((a,b) => b.answerCount - a.answerCount);
                case "LEAST_ANSWERED":
                    return questionArray.sort((a,b) => a.answerCount - b.answerCount);
            }
        }
    };
    const questions = useSelector(state => orderQuestions(Object.values(state.questions)));

    useEffect(() => {
        if (search) {
            setPageHeader(`Search results for \"${search}\"`);
            setSubtitle(" questions match your query");
        } else {
            setPageHeader("All Questions");
            setSubtitle(" questions asked so far");
        }
        window.scrollTo(0,0);
        dispatch(clearQuestions());
        dispatch(fetchQuestions({ page, search, order }))
            .catch(() => {
                history.push("/404");
            });
    }, [page, search, order]);

    if (questionCount) {
        const pageOutOfBounds = (questionCount < (page - 1) * 10 || page < 1);
        if (pageOutOfBounds) return <Redirect to="/404" />
    }

    if (!page) return <Redirect to="/questions?page=1"/>
    
    return (
        <div id="question-index" className="component-with-sidebar">
            <div id="question-index-header">
                <div>
                    <h1>{pageHeader}</h1>
                    <p>{questionCount + subtitle}</p>
                </div>
                <NavLink to="/questions/new" className="button-dark">Ask a Question</NavLink>
            </div>
            <div className="order-buttons">
                <button className={order === "NEWEST" ? "button-dark" : "button-light"}
                        onClick={e => {setOrder("NEWEST"); setPage(1)}}>Newest</button>
                <button className={order === "OLDEST" ? "button-dark" : "button-light"}
                        onClick={e => {setOrder("OLDEST"); setPage(1)}}>Oldest</button>
                <button className={order === "MOST_ANSWERED" ? "button-dark" : "button-light"}
                        onClick={e => {setOrder("MOST_ANSWERED"); setPage(1)}}>Most Answered</button>
                <button className={order === "LEAST_ANSWERED" ? "button-dark" : "button-light"}
                        onClick={e => {setOrder("LEAST_ANSWERED"); setPage(1)}}>Least Answered</button>
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