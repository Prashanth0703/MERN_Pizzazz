import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

function AddPizza() {
    const [name, setName] = useState("");
    const [sprice, setsPrice] = useState();
    const [mprice, setmPrice] = useState();
    const [lprice, setlPrice] = useState();
    const [category, setCategory] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const formHandler = (e) => {
        e.preventDefault();
        const pizza = {
            name,
            desc,
            image,
            category,
            prices: {
                small: sprice,
                medium: mprice,
                large: lprice,
            },
        };
        dispatch(addPizza(pizza));
    };
    const addPizzaState = useSelector((state) => state.addPizzaReducer);
    const { success, loading, error } = addPizzaState;
    return (
        <div>
            <div className="shadow-lg p-3 my-5 mx-3 bg-body rounded">
                <h1>Add Pizza</h1>
                {loading && <Loading />}
                {error && <Error error="Something went wrong" />}
                {success && <Success success="Pizza added successfully!" />}
                <form onSubmit={formHandler}>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="form-control"
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        onChange={(e) => setsPrice(e.target.value)}
                        value={sprice}
                        className="form-control"
                        type="text"
                        placeholder="Small varient price"
                    />
                    <input
                        onChange={(e) => setmPrice(e.target.value)}
                        value={mprice}
                        className="form-control"
                        type="text"
                        placeholder="Medium varient price"
                    />
                    <input
                        onChange={(e) => setlPrice(e.target.value)}
                        value={lprice}
                        className="form-control"
                        type="text"
                        placeholder="Large varient price"
                    />
                    <input
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="form-control"
                        type="text"
                        placeholder="Category"
                    />
                    <input
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                        className="form-control"
                        type="text"
                        placeholder="Description"
                    />
                    <input
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        className="form-control"
                        type="text"
                        placeholder="Image URL"
                    />
                    <button className="mt-3 btn btn-success" type="submit">
                        Add Pizza
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddPizza;
