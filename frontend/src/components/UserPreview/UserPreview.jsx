import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { dateStamp } from "../../dateUtil";

const UserPreview = ({ user }) => {

    const [timestamp, setTimestamp] = useState("");

    useEffect(() => {
        if (user) {
            setTimestamp(dateStamp(user.createdAt));
        }
    }, [user]);

    return (
        <li className="user-preview">
            <div className="user-preview-half-left">
                <Link to={`users/${user.id}`}>{user.username}</Link>
                <p>Member since {timestamp}</p>
            </div>
            <div className="user-preview-half-right">
                <p>{user.questionCount} question(s) asked</p>
                <p>{user.answerCount} answer(s) given</p>
            </div>
        </li>
    );
};

export default UserPreview;