const router = require("express").Router();
const { models } = require("mongoose");
const Pizza = require("../models/pizzaModel");

router.get("/getallpizzas", async (req, res) => {
    try {
        const pizzas = await Pizza.find({});
        res.send(pizzas);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/addpizza", async (req, res) => {
    const { pizza } = req.body;
    try {
        const newPizza = new Pizza({
            name: pizza.name,
            image: pizza.image,
            description: pizza.desc,
            category: pizza.category,
            varients: ["small", "medium", "large"],
            prices: [pizza.prices],
        });
        await newPizza.save();
        res.send("Pizza added successfully!");
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post("/getpizzabyid", async (req, res) => {
    const { pizzaid } = req.body;
    try {
        const pizza = await Pizza.findOne({ _id: pizzaid });
        res.send(pizza);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post("/editpizza", async (req, res) => {
    const editedpizza = req.body.editedpizza;
    try {
        const pizza = await Pizza.findOne({ _id: editedpizza._id });
        // console.log(pizza)
        (pizza.name = editedpizza.name),
            (pizza.description = editedpizza.description),
            (pizza.category = editedpizza.category),
            (pizza.image = editedpizza.image),
            (pizza.prices = [editedpizza.prices]);
        await pizza.save();
        res.send("Pizza edited successfully!");
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post("/deletepizza", async (req, res) => {
    const pizzaid = req.body.pizzaid;
    try {
        const pizza = await Pizza.findOneAndDelete({ _id: pizzaid });
        res.send("Pizza deleted successfully!");
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;
