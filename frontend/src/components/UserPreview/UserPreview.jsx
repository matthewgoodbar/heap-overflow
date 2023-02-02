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
            <Link to={`users/${user.id}`}>{user.username}</Link>
            <p>Member since {timestamp}</p>
            <p>{user.questionCount} question(s) asked | {user.answerCount} answer(s) given</p>
        </li>
    );
};

export default UserPreview;