import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { clearUsers, fetchUsers } from "../../store/user";
import { useQueryParam, NumberParam, StringParam } from "use-query-params";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";

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
            setPageHeader(`Search results for \"${search}\"`);
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

    if (false) return (
        <div id="user-index" className="component-with-sidebar">
            <img className="under-construction-1" alt="construction gif" />
            <img className="under-construction-2" alt="construction gif" />
            <img className="under-construction-3" alt="construction gif" />
        </div>
    );

    if (!page) return <Redirect to="/users?page=1"/>

    return (
        <div id="user-index" className="component-with-sidebar">
            <div id="user-index-header">
                <h1>{pageHeader}</h1>
                <p>{userCount + subtitle}</p>
            </div>
            <ul id="user-list">

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