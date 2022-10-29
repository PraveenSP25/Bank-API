const User = require("../models/user")
const { validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("validation failed.")
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name
    const email = req.body.email
    const acno = req.params.acno
    const password = req.body.password
    bcrypt.hash(password, 12).then(hashedpw => {
        const user = new User({
            name: name,
            email: email,
            acno: acno,
            password: hashedpw
        })
        return user.save()
    })
        .then(result => {
            res.status(201)
                .json({ message: "user created", Accountdetails: result._id })
        })

        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    let loadUser
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error("A user with this email could not found.")
                error.statusCode = 404;
                throw error;
            }
            loadUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error("incorrect password")
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                email: loadUser.email,
                userId: loadUser._id.toString()
            }, "supersecretkey", { expiresIn: "59min" }
            );
            res.status(200).json({
                token: token,
                userId: loadUser._id.toString()
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);

        })
}

exports.logout = (req, res, next) => {
    User.findById().then(posts => {
        res.status(200).json({ message: "logout successfully.", posts: posts })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}