import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAnswers, fetchAnswersByAuthor } from "../../store/answer";
import { clearQuestions, fetchQuestionsByAuthor } from "../../store/question";
import { useParams } from "react-router";
import { dateStamp } from "../../dateUtil";

const User = props => {

    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => state.users[userId]);
    const [timestamp, setTimestamp] = useState("");
    const answers = useSelector(state => Object.values(state.answers).sort((a, b) => b.createdAt - a.createdAt));
    const questions = useSelector(state => Object.values(state.questions).sort((a, b) => b.createdAt - a.createdAt));
    
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    useEffect(() => {
        if (userId) {
            dispatch(clearAnswers());
            dispatch(clearQuestions());
            dispatch(fetchAnswersByAuthor(userId));
            dispatch(fetchQuestionsByAuthor(userId));
        }
    }, [userId]);

    useEffect(() => {
        if (user) {
            setTimestamp(dateStamp(user.createdAt));
        }
    }, [user]);
    
    return (
        <div id="user-show" className="component-with-sidebar">
            <h2>{user.username}</h2>
            <p>Member since {timestamp}</p>
            <p>Total karma: {user.karma}</p>
        </div>
    );
};

export default User;