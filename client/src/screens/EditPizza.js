import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editPizza, getPizzaById } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
function EditPizza() {
    let successedit;
    const params = useParams();
    const [name, setName] = useState("");
    const [sprice, setsPrice] = useState();
    const [mprice, setmPrice] = useState();
    const [lprice, setlPrice] = useState();
    const [category, setCategory] = useState("");
    const [description, setdescription] = useState("");
    const [image, setImage] = useState("");
    const dispatch = useDispatch();

    const getPizzaBYIdState = useSelector((state) => state.getPizzaByIdReducer);
    const editPizzaState = useSelector((state) => state.editPizzaReducer);
    const { pizza, loading, error } = getPizzaBYIdState;

    const { editloading } = editPizzaState;

    useEffect(() => {
        if (pizza) {
            if (pizza._id === params.pizzaid) {
                setName(pizza.name);
                setsPrice(pizza.prices[0]["small"]);
                setmPrice(pizza.prices[0]["medium"]);
                setlPrice(pizza.prices[0]["large"]);
                setCategory(pizza.category);
                setdescription(pizza.description);
                setImage(pizza.image);
            } else {
                dispatch(getPizzaById(params.pizzaid));
            }
        } else {
            dispatch(getPizzaById(params.pizzaid));
        }
    }, [dispatch, pizza, params]);

    const formHandler = (e) => {
        e.preventDefault();
        const editedpizza = {
            _id: params.pizzaid,
            name,
            description,
            image,
            category,
            prices: {
                small: sprice,
                medium: mprice,
                large: lprice,
            },
        };
        dispatch(editPizza(editedpizza));
        successedit = true;
    };

    return (
        <div className="shadow-lg p-3 my-5 mx-3 bg-body rounded">
            <h1>Edit Pizza</h1>
            <h1>Pizza ID = {params.pizzaid}</h1>
            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            {editloading && <Loading />}
            {successedit && <Success success="Pizza edited successfullly" />}
            <form onSubmit={formHandler}>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="form-control"
                    type="text"
                    placeholder="Name"
                />
                <input
                    onChange={(e) => setsPrice(Number(e.target.value))}
                    value={sprice}
                    className="form-control"
                    type="text"
                    placeholder="Small varient price"
                />
                <input
                    onChange={(e) => setmPrice(Number(e.target.value))}
                    value={mprice}
                    className="form-control"
                    type="text"
                    placeholder="Medium varient price"
                />
                <input
                    onChange={(e) => setlPrice(Number(e.target.value))}
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
                    onChange={(e) => setdescription(e.target.value)}
                    value={description}
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
                    Edit Pizza
                </button>
            </form>
        </div>
    );
}

export default EditPizza;
