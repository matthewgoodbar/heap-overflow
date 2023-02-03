import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion } from "../../store/question";
import { Link } from "react-router-dom";
import { partialTimestamp } from "../../dateUtil";

const AnswerPreview = ({ answer }) => {

    const dispatch = useDispatch();
    const question = useSelector(state => state.questions[answer.questionId]);
    const [timestamp, setTimestamp] = useState("");

    useEffect(() => {
        dispatch(fetchQuestion(answer.questionId));
        setTimestamp(partialTimestamp(answer.createdAt));
    }, [answer])

    if (!question) return <li></li>

    const maxPreviewBodyLength = 100;
    const previewBody = (answer.body.length <= maxPreviewBodyLength) ? answer.body : answer.body.substring(0, maxPreviewBodyLength) + "...";

    return (
        <li className="answer-preview">
            <p className="answer-preview-subtext">
                In response to <Link to={`/questions/${question.id}`}>{question.title}</Link> from <Link to={`/users/${question.authorId}`}>{question.author.username}</Link>
            </p>
            <p>{previewBody}</p>
            <p className="answer-preview-subtext">{answer.voteSum} points | Answered at {timestamp}</p>
        </li>
    );
};

export default AnswerPreview;