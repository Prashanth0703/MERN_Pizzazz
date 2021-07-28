import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

function OrdersList() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);
    const getAllOrdersState = useSelector((state) => state.getAllOrdersReducer);
    const { loading, error, orders } = getAllOrdersState;
    return (
        <div className="table-responsive-sm">
            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            <h1>Orders List</h1>
            <table className="table table-bordered border-dark ">
                <thead className="table-dark">
                    <tr>
                        <th>Order ID</th>
                        <th>Email</th>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        return (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.email}</td>
                                <td>{order.userid}</td>
                                <td>{order.orderAmount}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>
                                    {order.isDelivered ? (
                                        <h1>Delivered</h1>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                dispatch(
                                                    deliverOrder(order._id)
                                                );
                                            }}
                                            className="btn btn-danger"
                                        >
                                            Deliver
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default OrdersList;
