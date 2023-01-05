
const QuestionPreview = ({ question }) => {
    
    return (
        <li className="question-preview">
            <p>{question.title}</p>
            <p>By: {question.author.username}</p>
        </li>
    );
};

export default QuestionPreview;