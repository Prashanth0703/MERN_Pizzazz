import axios from "axios";

export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    try {
        const res = await axios.post("/api/users/register", user);
        dispatch({ type: "USER_REGISTER_SUCCESS" });
        console.log(res);
    } catch (error) {
        dispatch({ type: "USER_REGISTER_FAILED", payload: error });
    }
};

export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    try {
        const res = await axios.post("/api/users/login", user);
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        console.log(res);
        window.location.href = "/";
    } catch (error) {
        dispatch({ type: "USER_LOGIN_FAILED", payload: error });
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
};

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "GET_ALLUSERS_REQUEST" });
    try {
        const users = await axios.get("/api/users/getallusers");
        dispatch({ type: "GET_ALLUSERS_SUCCESS", payload: users.data });
    } catch (err) {
        dispatch({ type: "GET_ALLUSERS_FAILED", payload: err });
    }
};

export const deleteUser = (userid) => async (dispatch) => {
    try {
        await axios.post("/api/users/deleteuser", { userid });
        alert(" User deleted Successfully");
        const users = await axios.get("/api/users/getallusers");
        dispatch({ type: "GET_ALLUSERS_SUCCESS", payload: users.data });
    } catch (err) {
        alert("Something went wrong!");
    }
};
