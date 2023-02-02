import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { clearUsers, fetchUsers } from "../../store/user";
import { useQueryParam, NumberParam, StringParam } from "use-query-params";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import UserPreview from "../UserPreview";

const UserIndex = props => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [pageHeader, setPageHeader] = useState("All Users");
    const [subtitle, setSubtitle] = useState(" total users");
    const [page, setPage] = useQueryParam('page', NumberParam);
    const [search, setSearch] = useQueryParam('search', StringParam);
    const userCount = useSelector(state => state.userCount.count);
    const users = useSelector(state => Object.values(state.users));

    useEffect(() => {
        if (search) {
            setPageHeader(`Search results for "${search}"`);
            setSubtitle(" user(s) found");
        } else {
            setPageHeader("All Users");
            setSubtitle(" total users");
        }
        window.scrollTo(0,0);
        dispatch(clearUsers());
        dispatch(fetchUsers({ page, search }))
            .catch(() => {
                history.push("/404");
            });
    }, [page, search]);

    if (userCount) {
        const pageOutOfBounds = (userCount < (page - 1) * 10 || page < 1);
        if (pageOutOfBounds) return <Redirect to="/404" />
    }

    if (!page) return <Redirect to="/users?page=1"/>

    return (
        <div id="user-index" className="component-with-sidebar">
            <div id="user-index-header">
                <div>
                    <h1>{pageHeader}</h1>
                    <p>{userCount + subtitle}</p>
                </div>
            </div>
            <ul id="user-list">
                {users.map((user) => <UserPreview key={user.id} user={user} />)}
            </ul>
            <div className="page-buttons">
                { (page !== 1) &&
                <div onClick={e => setPage(num => num-1)} className="button-light">Prev</div>
                }
                { (userCount > page * 10) &&
                <div onClick={e => setPage(num => num+1)} className="button-light">Next</div>
                }
            </div>
        </div>
    );
};

export default UserIndex;