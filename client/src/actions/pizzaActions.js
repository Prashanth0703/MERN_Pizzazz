import axios from "axios";

export const getAllPizzas = () => async (dispatch) => {
    dispatch({ type: "GET_PIZZAS_REQUEST" });
    try {
        const res = await axios.get("/api/pizzas/getallpizzas");
        console.log(res);
        dispatch({ type: "GET_PIZZAS_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "GET_PIZZAS_FAILED", payload: err });
    }
};

export const filterPizzas = (searchkey, category) => async (dispatch) => {
    var filteredPizzas;
    dispatch({ type: "GET_PIZZAS_REQUEST" });
    try {
        const res = await axios.get("/api/pizzas/getallpizzas");
        filteredPizzas = res.data.filter((pizza) =>
            pizza.name.toLowerCase().includes(searchkey)
        );
        if (category !== "all") {
            filteredPizzas = res.data.filter(
                (pizza) => pizza.category.toLowerCase() === category
            );
        }
        dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizzas });
    } catch (err) {
        dispatch({ type: "GET_PIZZAS_FAILED", payload: err });
    }
};

export const addPizza = (pizza) => async (dispatch) => {
    dispatch({ type: "ADD_PIZZA_REQUEST" });
    try {
        const res = await axios.post("/api/pizzas/addpizza", { pizza });
        dispatch({ type: "ADD_PIZZA_SUCCESS" });
    } catch (err) {
        dispatch({ type: "ADD_PIZZA_FAILED", payload: err });
    }
};

export const getPizzaById = (pizzaid) => async (dispatch) => {
    dispatch({ type: "GET_PIZZABYID_REQUEST" });
    try {
        const res = await axios.post("/api/pizzas/getpizzabyid", { pizzaid });
        dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "GET_PIZZABYID_FAILED", payload: err });
    }
};

export const editPizza = (editedpizza) => async (dispatch) => {
    dispatch({ type: "EDIT_PIZZA_REQUEST" });
    try {
        const res = await axios.post("/api/pizzas/editpizza", { editedpizza });
        dispatch({ type: "EDIT_PIZZA_SUCCESS" });
        const res1 = await axios.post("/api/pizzas/getpizzabyid", {
            editedpizza,
        });
        dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: res1.data._id });
    } catch (err) {
        dispatch({ type: "EDIT_PIZZA_FAILED", payload: err });
    }
};

export const deletePizza = (pizzaid) => async (dispatch) => {
    try {
        const res = await axios.post("/api/pizzas/deletepizza", { pizzaid });
        alert("Pizza deleted Successfully");
        window.location.reload();
    } catch (err) {
        alert("Something went wrong!");
    }
};
