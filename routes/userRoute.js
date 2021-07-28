const router = require("express").Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    try {
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).send({ message: error });
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email, password });
        if (user.length > 0) {
            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isAdmin: user[0].isAdmin,
                _id: user[0]._id,
            };
            res.send(currentUser);
        } else {
            res.status(400).json({ message: "User login failed" });
        }
    } catch (err) {
        return res.status(400).json({ message: "something went wrong" });
    }
});

router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post("/deleteuser", async (req, res) => {
    const { userid } = req.body;
    try {
        const user = await User.findOneAndDelete({ _id: userid });
        res.send("user deleted");
    } catch (error) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;
