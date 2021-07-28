import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterPizzas } from "../actions/pizzaActions";

function Filter() {
    const [category, setCategory] = useState("all");
    const [searchKey, setSearchKey] = useState("");
    const dispatch = useDispatch();
    return (
        <div className="container">
            <div className="row justify-content-center shadow-lg p-3 mb-5 bg-body rounded">
                <div className="col-md-3 ">
                    <input
                        value={searchKey}
                        type="search"
                        onChange={(e) => setSearchKey(e.target.value)}
                        placeholder="Search Pizzas"
                        className="form-control w-100"
                    />
                </div>
                <div className="col-md-3 ">
                    <select
                        className="form-control w-100 mt-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non Veg</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <button
                        onClick={() => {
                            dispatch(filterPizzas(searchKey, category));
                            setSearchKey("");
                        }}
                        className="btn-filter btn btn-primary w-100 mt-2"
                    >
                        <i className="fa fa-filter"></i> FILTER
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;
