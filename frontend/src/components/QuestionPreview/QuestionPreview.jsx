
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { partialTimestamp } from "../../dateUtil";

const QuestionPreview = ({ question, hideAuthorTag }) => {

    const [timestamp, setTimestamp] = useState("");
    const [authorName, setAuthorName] = useState(question.author.username);
    const currentUser = useSelector(state => state.session.currentUser);

    useEffect(() => {
        if (currentUser && question.authorId === currentUser.id) {
            setAuthorName("you");
        } else {
            setAuthorName(question.author.username);
        }
    }, [currentUser]);

    useEffect(() => {
        if (question) {
            setTimestamp(partialTimestamp(question.createdAt));
        }
    }, [question]);

    const maxPreviewBodyLength = 100;
    const previewBody = (question.body.length <= maxPreviewBodyLength) ? question.body : question.body.substring(0, maxPreviewBodyLength) + "...";
    
    return (
        <li className="question-preview">
            <Link to={`/questions/${question.id}`}><h3>{question.title}</h3></Link>
            <p>{previewBody}</p>
            <p>{question.answerCount} answer{question.answerCount === 1 ? "" : "s"} | Asked at {timestamp}</p>
            {!hideAuthorTag &&
            <p id="author-tag">Asked by <Link to={`/users/${question.authorId}`}>{authorName}</Link></p>
            }
        </li>
    );
};

export default QuestionPreview;