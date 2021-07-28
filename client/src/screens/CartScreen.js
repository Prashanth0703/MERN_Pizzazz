import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";
import AOS from "aos";
import "aos/dist/aos.css";

function CartScreen() {
    const cartState = useSelector((state) => state.cartReducer);
    const cartItems = cartState.cartItems;
    var subTotal = cartItems.reduce((x, item) => x + item.price, 0);
    const dispatch = useDispatch();
    AOS.init();
    return (
        <div className="row justify-content-center p-2" data-aos="fade-down">
            <div className="col-md-6 ">
                <h2 style={{ fontSize: "35px" }}>My Cart</h2>
                {cartItems.map((item) => {
                    return (
                        <>
                            <div key={item._id} className="flex-container">
                                <div className="text-start m-1 w-100">
                                    <h1>
                                        {item.name} [{item.varient}]
                                    </h1>
                                    <h1>
                                        Price : {item.quantity} *{" "}
                                        {item.prices[0][item.varient]} ={" "}
                                        {item.price}
                                    </h1>
                                    <h1 style={{ display: "inline" }}>
                                        Quantity :
                                    </h1>
                                    <i
                                        className="fa fa-plus"
                                        ariaHidden="true"
                                        onClick={() =>
                                            dispatch(
                                                addToCart(
                                                    item,
                                                    item.quantity + 1,
                                                    item.varient
                                                )
                                            )
                                        }
                                    ></i>
                                    <b>{item.quantity}</b>
                                    <i
                                        className="fa fa-minus"
                                        ariaHidden="true"
                                        onClick={() =>
                                            dispatch(
                                                addToCart(
                                                    item,
                                                    item.quantity - 1,
                                                    item.varient
                                                )
                                            )
                                        }
                                    ></i>
                                </div>

                                <div className="w-100 m-1">
                                    <img
                                        style={{
                                            height: "80px",
                                            width: "80px",
                                        }}
                                        src={item.image}
                                        alt=""
                                    />
                                </div>
                                <div className="w-100 m-1">
                                    <i
                                        className="fa fa-trash mt-4"
                                        ariaHidden="true"
                                        onClick={() => {
                                            dispatch(deleteFromCart(item));
                                        }}
                                    ></i>
                                </div>
                            </div>
                            <hr />
                        </>
                    );
                })}
            </div>
            <div className="col-md-4">
                <h2 style={{ fontSize: "20px" }}>
                    Subtotal({cartItems.length} items) : {subTotal} /-
                </h2>
                <Checkout subtotal={subTotal} />
            </div>
        </div>
    );
}

export default CartScreen;
