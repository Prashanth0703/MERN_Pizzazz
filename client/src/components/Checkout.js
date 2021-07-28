import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";
import Error from "./Error";
import Loading from "./Loading";
import Success from "./Success";
function Checkout({ subtotal }) {
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state.placeOrderReducer);
    const { loading, error, success } = orderState;
    const tokenHandler = (token) => {
        console.log(token);
        dispatch(placeOrder(token, subtotal));
    };

    return (
        <div>
            {loading && <Loading />}
            {error && <Error error="Payment failed" />}
            {success && <Success success="Order was placed successfully" />}
            <StripeCheckout
                amount={subtotal * 100}
                shippingAddress
                token={tokenHandler}
                stripeKey={process.env.REACT_APP_PK_STRIPE}
                currency="INR"
            >
                <button className="btn btn-danger">Pay Now</button>
            </StripeCheckout>
        </div>
    );
}

export default Checkout;
