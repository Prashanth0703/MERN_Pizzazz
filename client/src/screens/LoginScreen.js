import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.loginUserReducer);
    const { loading, error } = loginState;
    const login = () => {
        const user = { email, password };
        dispatch(loginUser(user));
    };
    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            window.location.href = "/";
        }
    }, []);
    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-body rounded">
                    {loading && <Loading />}
                    {error && <Error error="Invalid credentials" />}
                    <div>
                        <input
                            required
                            type="text"
                            placeholder="Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            required
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={login}
                            className="btn btn-success mt-3 mb-2"
                        >
                            LOGIN
                        </button>
                        <br />
                        <a
                            style={{ color: "black", textDecoration: "none" }}
                            href="/register"
                        >
                            Click here to Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
