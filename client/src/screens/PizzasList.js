import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPizzas } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { deletePizza } from "../actions/pizzaActions";
function PizzasList() {
    const dispatch = useDispatch();

    const pizzasState = useSelector((state) => state.getAllPizzasReducer);

    const { pizzas, error, loading } = pizzasState;
    useEffect(() => {
        dispatch(getAllPizzas());
    }, [dispatch]);
    return (
        <div className="table-responsive-sm">
            <h1>Pizzas List</h1>
            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            <table className="table table-bordered border-dark">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Prices</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pizzas &&
                        pizzas.map((pizza) => {
                            return (
                                <tr>
                                    <td>{pizza.name}</td>
                                    <td>
                                        Small : {pizza.prices[0]["small"]}
                                        <br />
                                        Medium : {pizza.prices[0]["medium"]}
                                        <br />
                                        Large : {pizza.prices[0]["large"]}
                                    </td>
                                    <td>{pizza.category}</td>
                                    <td>
                                        <i
                                            onClick={() => {
                                                dispatch(
                                                    deletePizza(pizza._id)
                                                );
                                            }}
                                            className="me-2 fa fa-trash"
                                        ></i>
                                        <Link
                                            to={`/admin/editpizza/${pizza._id}`}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default PizzasList;
