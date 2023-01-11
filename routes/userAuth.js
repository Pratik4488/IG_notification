const User = require("../models/users");

const router = require("express").Router();

router.post("/login/e", async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if(req.body.password === user.password)
                res.status(200).json(user);
            else {
                res.status(300).json({"msg":"password does not match"})
            }
        }
        else {
            return res.status(404).json({"msg":"user not found"})
        }
    } catch (err) {
        res.status(500).json({"err":err})
    }
})


router.post("/login/u", async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            if(req.body.password === user.password)
                res.status(200).json(user);
            else {
                res.status(300).json({"msg":"password does not match"})
            }
        }
        else {
            return res.status(404).json({"msg":"user not found"})
        }
    } catch (err) {
        res.status(500).json({"err":err})
    }
})

router.post("/login/ph", async (req, res, next) => {
    try {
        const user = await User.findOne({ phone: req.body.phone });
        if (user) {
            if(req.body.password === user.password)
                res.status(200).json(user);
            else {
                res.status(300).json({"msg":"password does not match"})
            }
        }
        else {
            return res.status(404).json({"msg":"user not found"})
        }
    } catch (err) {
        res.status(500).json({"err":err})
    }
} )

module.exports = router;