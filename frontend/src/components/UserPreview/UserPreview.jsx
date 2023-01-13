
const UserPreview = ({ user }) => {

    return (
        <li className="user-preview">
            <p>{user.username}</p>
        </li>
    );
};

export default UserPreview;