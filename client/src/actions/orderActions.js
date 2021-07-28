import axios from "axios";

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
    dispatch({ type: "PLACE_ORDER_REQUEST" });
    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;
    try {
        const res = await axios.post("/api/order/placeorder", {
            token,
            subtotal,
            currentUser,
            cartItems,
        });
        dispatch({ type: "PLACE_ORDER_SUCCESS" });
        console.log(res);
    } catch (err) {
        dispatch({ type: "PLACE_ORDER_FAILED" });
    }
};

export const getUserOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser;
    dispatch({ type: "GET_USER_ORDERS_REQUEST" });
    try {
        const res = await axios.post("/api/order/getuserorders", {
            userid: currentUser._id,
        });
        console.log(res);
        dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "GET_USER_ORDERS_FAILED", payload: err });
    }
};

export const getAllOrders = () => async (dispatch) => {
    dispatch({ type: "GET_ALLORDERS_REQUEST" });
    try {
        const res = await axios.get("/api/order/getallorders");
        console.log(res);
        dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "GET_ALLORDERS_FAILED", payload: err });
    }
};

export const deliverOrder = (orderid) => async (dispatch) => {
    try {
        const order = await axios.post("/api/order/deliverorder", { orderid });
        alert("order delivered");
        const orders = await axios.get("/api/order/getallorders");
        dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: orders.data });
    } catch (error) {
        console.log(error);
    }
};
