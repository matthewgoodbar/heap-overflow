import { useDispatch, useSelector } from "react-redux";

const Answer = ({ answer }) => {

    if (!answer) return <div className="answer"></div>
    
    return (
        <div className="answer">
            <p>{answer.body}</p>
        </div>
    );
};

export default Answer;