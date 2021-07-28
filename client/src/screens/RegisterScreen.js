import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
    const dispatch = useDispatch();
    const registerState = useSelector((state) => state.registerUserReducer);
    const { loading, success, error } = registerState;
    const register = () => {
        if (password !== cpassword) {
            alert("Your password doesnt match");
        } else {
            const user = {
                name,
                email,
                password,
            };
            console.log(user);
            dispatch(registerUser(user));
            setName("");
            setEmail("");
            setPassword("");
            setcPassword("");
        }
    };
    return (
        <div>
            <div className="row justify-content-center ">
                <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-body rounded">
                    {loading && <Loading />}
                    {success && (
                        <Success success="User Registration Successful!" />
                    )}
                    {error && <Error error="User already registered" />}
                    <div>
                        <input
                            required
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        <input
                            required
                            type="password"
                            placeholder="Conirm Password"
                            className="form-control"
                            value={cpassword}
                            onChange={(e) => setcPassword(e.target.value)}
                        />
                        <button
                            onClick={register}
                            className="btn btn-primary mt-3 mb-2"
                        >
                            REGISTER
                        </button>
                        <br />
                        <a
                            style={{ color: "black", textDecoration: "none" }}
                            href="/login"
                        >
                            Click here to Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterScreen;
