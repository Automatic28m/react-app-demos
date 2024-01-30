import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCartItems } from "../selectors/cartSelectors";

function Navbar({page}) {
    const cartItems = useSelector(selectCartItems);
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <h1>ReactJS</h1>
                    {/* <span className="fs-4">Simple header</span> */}
                </a>

                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to="/" className={`nav-link ${page === 'Home' ? 'active' : ''}`} aria-current="page">Home</Link></li>
                    <li className="nav-item"><Link to="/ShoppingCart" className={`nav-link ${page === 'ShoppingCart' ? 'active' : ''}`}>{cartItems.length} products in your cart</Link></li>
                </ul>
            </header>
        </div>
    )
}

export default Navbar;