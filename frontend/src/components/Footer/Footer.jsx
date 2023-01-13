import { Link } from "react-router-dom";

const Footer = props => {
    return (
        <footer id="footer">
            <div className="footer-compartment">
                <Link to="/">
                    <img className="logo-image" alt="heap-overflow-logo" />
                </Link>
            </div>
            <div className="footer-compartment footer-compartment-border">
                <Link className="footer-link" to="/login">Log In</Link>
                <Link className="footer-link" to="/signup">Sign Up</Link>
                <Link className="footer-link" to="/questions">Questions</Link>
            </div>
            <div className="footer-compartment footer-compartment-border">
                <Link className="footer-link" to="/404">About</Link>
                <Link className="footer-link" to="/404">Github</Link>
                <Link className="footer-link" to="/404">LinkedIn</Link>
            </div>
        </footer>
    );
};

export default Footer;