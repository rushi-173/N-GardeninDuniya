const bcrypt = require('bcryptjs');
const User = require("../../models/User");

const signup = async (req, res) => {
    console.log(req.body);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(409).json({ message: "Email is already registered" });
            return;
        }
        user = await User.findOne({ username: req.body.username });
        if (user) {
            res.status(409).json({ message: "Username is not available" });
            return;
        }
        user = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,   
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(password, salt);
        const newUser = await User.create(user);
        console.log(newUser);
        res.status(201).json({ success: true })
    } catch (err) {
        console.log(err);
        res.status(404).json({ success: false })
    }
}

module.exports = signup;