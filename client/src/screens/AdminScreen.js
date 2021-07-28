import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import AddPizza from "./AddPizza";
import EditPizza from "./EditPizza";
import OrdersList from "./OrdersList";
import PizzasList from "./PizzasList";
import UsersList from "./UsersList";

function AdminScreen() {
    const userState = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userState;
    useEffect(() => {
        if (!currentUser.isAdmin) {
            alert("Access denied!");
            window.location.href = "/";
        }
    }, [currentUser.isAdmin]);
    return (
        <div>
            <div className="row justify-content-center p-3">
                <div className="col-md-10 ">
                    <h2 style={{ fontSize: "2rem" }}>Admin Panel</h2>
                    <ul className="adminfunc">
                        <li>
                            <Link to="/admin/userslist">Users List</Link>
                        </li>
                        <li>
                            <Link to="/admin/pizzaslist">Pizzas List</Link>
                        </li>
                        <li>
                            <Link to="/admin/addpizza">Add New Pizza</Link>
                        </li>
                        <li>
                            <Link to="/admin/orderslist">Orders List</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/admin" component={UsersList} exact />
                        <Route
                            path="/admin/userslist"
                            component={UsersList}
                            exact
                        />
                        <Route
                            path="/admin/pizzaslist"
                            component={PizzasList}
                            exact
                        />
                        <Route
                            path="/admin/addpizza"
                            component={AddPizza}
                            exact
                        />
                        <Route
                            path="/admin/orderslist"
                            component={OrdersList}
                            exact
                        />
                        <Route
                            path="/admin/editpizza/:pizzaid"
                            component={EditPizza}
                            exact
                        />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default AdminScreen;
