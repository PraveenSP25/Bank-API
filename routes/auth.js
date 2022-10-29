const express = require("express")
const { body } = require('express-validator');
const User = require("../models/user")
const authcontroler = require("../controler/auth")

const router = express.Router()
router.put("/signup", [
    body("email")
        .isEmail()
        .withMessage("please enter valid email address.")
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userdoc => {
                if (userdoc) {
                    return Promise
                        .reject("E-mail adress is already Exist please try another E-mail")
                }

            })

        })
        .normalizeEmail(),
    body("password")
        .trim()
        .isLength({ min: 5 }),
    body("name")
        .trim()
        .not()
        .isEmpty()
], authcontroler.signup)

router.post("/login", authcontroler.login)
router.post('/logout/:postId', authcontroler.logout)
module.exports = router