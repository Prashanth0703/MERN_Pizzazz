import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import AOS from "aos";
import "aos/dist/aos.css";

function Pizza({ pizza }) {
    const [quantity, setQuantity] = useState(1);
    const [varient, setVarient] = useState("small");
    const [show, setShow] = useState(false);
    AOS.init();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const addtocart = () => {
        dispatch(addToCart(pizza, quantity, varient));
    };

    return (
        <div
            data-aos="fade-up"
            className="shadow-lg p-3 my-5 mx-3 bg-body rounded"
        >
            <div onClick={handleShow}>
                <h1
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {pizza.name}
                </h1>
                <br />
                <img
                    className="img-fluid"
                    src={pizza.image}
                    alt=""
                    style={{
                        height: "200px",
                        width: "200px",
                    }}
                />
            </div>

            <div className="flex-container">
                <div className="w-100 m-2">
                    <p>Varients:</p>
                    <select
                        className="form-control"
                        onChange={(e) => setVarient(e.target.value)}
                    >
                        {pizza.varients.map((varient, ind) => {
                            return (
                                <option key={ind} value={varient}>
                                    {varient}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="w-100 m-2">
                    <p>Quantity:</p>
                    <select
                        className="form-control"
                        onChange={(e) => setQuantity(e.target.value)}
                    >
                        {[...Array(10).keys()].map((num, ind) => {
                            return (
                                <option key={ind} value={num + 1}>
                                    {num + 1}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="flex-container">
                <div className="m-1 w-100">
                    <p style={{ paddingTop: "10px", fontWeight: "600" }}>
                        Price: {pizza.prices[0][varient] * quantity} Rs/-
                    </p>
                </div>
                <div className="m-1 w-100">
                    <button
                        onClick={addtocart}
                        className="btn btn-cart"
                        type="button"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{pizza.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        className="img-fluid"
                        style={{ height: "350px", width: "350px" }}
                        src={pizza.image}
                        alt=""
                    />
                    <p>{pizza.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{ backgroundColor: "red" }}
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Pizza;
