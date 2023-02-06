import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAnswers, fetchAnswersByAuthor } from "../../store/answer";
import { clearQuestions, fetchQuestionsByAuthor } from "../../store/question";
import { useParams } from "react-router";
import { dateStamp } from "../../dateUtil";
import QuestionPreview from "../QuestionPreview"
import AnswerPreview from "../AnswerPreview/";
import { fetchUser } from "../../store/user";

const User = props => {

    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => state.users[userId]);
    const [timestamp, setTimestamp] = useState("");
    const [tab, setTab] = useState("QUESTIONS");
    const answers = useSelector(state => Object.values(state.answers).sort((a, b) => b.createdAt - a.createdAt));
    const questions = useSelector(state => Object.values(state.questions).sort((a, b) => b.createdAt - a.createdAt));
    
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    useEffect(() => {
        if (userId) {
            // dispatch(clearAnswers());
            // dispatch(clearQuestions());
            // dispatch(fetchAnswersByAuthor(userId));
            // dispatch(fetchQuestionsByAuthor(userId));
            dispatch(fetchUser(userId));
            handleQuestionTab();
        }
    }, [userId]);

    useEffect(() => {
        if (user) {
            setTimestamp(dateStamp(user.createdAt));
        }
    }, [user]);

    const handleQuestionTab = e => {
        setTab("QUESTIONS");
        dispatch(clearAnswers());
        dispatch(clearQuestions());
        dispatch(fetchQuestionsByAuthor(userId));
    };

    const handleAnswerTab = e => {
        setTab("ANSWERS");
        dispatch(clearAnswers());
        dispatch(clearQuestions());
        dispatch(fetchAnswersByAuthor(userId));
    };

    if (!user) return <div id="user-show" className="component-with-sidebar"></div>
    
    return (
        <div id="user-show" className="component-with-sidebar">
            <div className="user-header">
                <h1>{user.username}</h1>
                <div className="user-info">
                    <p>Member since {timestamp}</p>
                    <p>Total karma: {user.karma}</p>
                </div>
            </div>
            <div className="user-tab-buttons">
                <button className={tab === "QUESTIONS" ? "button-dark" : "button-light"}
                onClick={handleQuestionTab}
                >Questions</button>
                <button className={tab === "ANSWERS" ? "button-dark" : "button-light"}
                onClick={handleAnswerTab}
                >Answers</button>
            </div>
            {(tab === "QUESTIONS") &&
            <p>{questions.length} question(s) asked by {user.username}</p>
            }
            {(tab === "ANSWERS") &&
            <p>{answers.length} answer(s) given by {user.username}</p>
            }
            <div className="user-post-list">
                {(tab === "QUESTIONS" && questions.length !== 0) &&
                <ul>
                    {questions.map(question => <QuestionPreview key={question.id} question={question} hideAuthorTag={true} />)}
                </ul>
                }
                {(tab === "QUESTIONS" && questions.length === 0) &&
                <div className="user-none-yet">
                    <h3>This user has not asked any questions yet!</h3>
                </div>
                }
                {(tab === "ANSWERS" && answers.length !== 0) &&
                <ul>
                    {answers.map(answer => <AnswerPreview key={answer.id} answer={answer} />)}
                </ul>
                }
                {(tab === "ANSWERS" && answers.length === 0) &&
                <div className="user-none-yet">
                    <h3>This user has not provided any answers yet!</h3>
                </div>
                }
            </div>
        </div>
    );
};

export default User;