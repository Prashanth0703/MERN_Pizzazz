import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import AOS from "aos";
import "aos/dist/aos.css";

function OrdersScreen() {
    AOS.init();
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state.getUserOrdersReducer);
    const { loading, error, orders } = orderState;
    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch]);
    return (
        <div>
            <h2 style={{ fontSize: "30px" }}>My Orders</h2>
            <div className="row justify-content-center table-responsive-sm">
                {loading && <Loading />}
                {error && <Error error="Something went Wrong" />}
                {orders &&
                    orders.map((order) => {
                        return (
                            <div
                                style={{ backgroundColor: "#76cbfe" }}
                                className="col-md-10 m-2"
                                data-aos="fade-down"
                            >
                                <div className="flex-container">
                                    <div className=" text-start w-100 m-2">
                                        <h2
                                            style={{
                                                fontSize: "2rem",
                                            }}
                                        >
                                            Items
                                        </h2>
                                        <hr />
                                        {order.orderItems.map((item) => {
                                            return (
                                                <div className="flex-container">
                                                    <p>
                                                        {item.name} [
                                                        {item.varient}] *
                                                        {item.quantity} ={" "}
                                                        {item.price}
                                                    </p>
                                                    <img
                                                        style={{
                                                            width: "80px",
                                                            height: "80px",
                                                            margin: "0 20px 15px 20px",
                                                        }}
                                                        src={item.image}
                                                        alt=""
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="text-start w-100 m-2">
                                        <h2
                                            style={{
                                                fontSize: "2rem",
                                            }}
                                        >
                                            Address
                                        </h2>
                                        <hr />
                                        <p>
                                            Street :{" "}
                                            {order.shippingAddress.street}
                                        </p>
                                        <p>
                                            City : {order.shippingAddress.city}
                                        </p>
                                        <p>
                                            Country :{" "}
                                            {order.shippingAddress.country}
                                        </p>
                                        <p>
                                            Pincode :{" "}
                                            {order.shippingAddress.pincode}
                                        </p>
                                    </div>
                                    <div className="text-start w-100 m-2">
                                        <h2
                                            style={{
                                                fontSize: "2rem",
                                            }}
                                        >
                                            Order Info
                                        </h2>
                                        <hr />
                                        <p>
                                            Order Amount : {order.orderAmount}
                                        </p>
                                        <p>
                                            Date :{" "}
                                            {order.createdAt.substring(0, 10)}
                                        </p>
                                        <p>
                                            Transaction ID :{" "}
                                            {order.transactionId}
                                        </p>
                                        <p>Order ID : {order._id}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default OrdersScreen;
