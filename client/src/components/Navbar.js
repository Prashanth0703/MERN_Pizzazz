import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";

function Navbar() {
    const cartState = useSelector((state) => state.cartReducer);
    const userState = useSelector((state) => state.loginUserReducer);
    const dispatch = useDispatch();
    const { currentUser } = userState;
    return (
        <div style={{ marginBottom: "30px" }}>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        PIZZAZZ
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavDropdown"
                    >
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="admin">
                                    Admin
                                </a>
                            </li>
                            {currentUser ? (
                                <div className="dropdown">
                                    <a
                                        className="dropdown-toggle nav-link"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {currentUser.name}
                                    </a>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                    >
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="/orders"
                                            >
                                                Orders
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={() => {
                                                    dispatch(logoutUser());
                                                }}
                                            >
                                                <li>Logout</li>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <li className="nav-item">
                                    <a className="nav-link" href="login">
                                        Login
                                    </a>
                                </li>
                            )}

                            <li className="nav-item">
                                <a className="nav-link" href="cart">
                                    Cart {cartState.cartItems.length}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
