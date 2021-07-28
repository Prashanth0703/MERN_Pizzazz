import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import Pizza from "../components/Pizza";

function HomeScreen() {
    const dispatch = useDispatch();

    const pizzasState = useSelector((state) => state.getAllPizzasReducer);

    const { pizzas, error, loading } = pizzasState;

    useEffect(() => {
        dispatch(getAllPizzas());
    }, [dispatch]);
    return (
        <div>
            <Filter />
            <div className="row justify-content-center">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Error error="Something went wrong" />
                ) : (
                    <>
                        {pizzas.map((pizza) => {
                            return (
                                <div className="col-lg-4 col-md-6">
                                    <div key={pizza._id}>
                                        <Pizza pizza={pizza} />
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}

export default HomeScreen;
