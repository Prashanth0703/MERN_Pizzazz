import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

function UsersList() {
    const dispatch = useDispatch();

    const pizzasState = useSelector((state) => state.getAllUsersReducer);

    const { users, error, loading } = pizzasState;
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);
    return (
        <div className="table-responsive-sm">
            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            <h1>Users List</h1>
            <table className="table table-bordered border-dark">
                <thead className="table-dark">
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <i
                                            onClick={() =>
                                                dispatch(deleteUser(user._id))
                                            }
                                            className="fa fa-trash"
                                        ></i>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;
