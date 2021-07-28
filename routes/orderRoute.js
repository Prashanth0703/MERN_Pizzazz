const router = require("express").Router();
const stripe = require("stripe")(process.env.SK_STRIPE);
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        const payment = await stripe.charges.create(
            {
                amount: subtotal * 100,
                currency: "inr",
                customer: customer.id,
                receipt_email: token.email,
            },
            {
                idempotencyKey: uuidv4(),
            }
        );
        if (payment) {
            const newOrder = new Order({
                name: currentUser.name,
                email: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                orderAmount: subtotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip,
                },
                transactionId: payment.source.id,
            });
            newOrder.save();
            res.send("Order placed successfully");
        } else {
            res.send("Payment failed");
        }
    } catch (err) {
        res.status(400).json({ message: "something went wrong" });
    }
});

router.post("/getuserorders", async (req, res) => {
    const { userid } = req.body;
    try {
        const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
        res.send(orders);
    } catch (err) {
        res.status(400).json({ message: "something went wrong" });
    }
});

router.get("/getallorders", async (req, res) => {
    try {
        const orders = await Order.find({});
        res.send(orders);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.post("/deliverorder", async (req, res) => {
    try {
        const { orderid } = req.body;
        const order = await Order.findOne({ _id: orderid });
        order.isDelivered = true;
        order.save();
        res.send(order);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
