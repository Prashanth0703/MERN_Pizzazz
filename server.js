const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Pizza = require("./models/pizzaModel");
dotenv.config();
const app = express();

const pizzaRoute = require("./routes/pizzasRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const mongoURL = process.env.ATLAS_URI;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

mongoose.connection.once("open", () => {
    console.log("MongoDb connected");
});

app.use("/api/pizzas", pizzaRoute);
app.use("/api/users", userRoute);
app.use("/api/order", orderRoute);

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static("./client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client/build/index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
