
const { validationResult } = require('express-validator')

const Post = require('../models/post')
const { default: mongoose } = require('mongoose')
const User = require("../models/user")


exports.createaccount = (req, res, next) => {

    Post.findOne({ phoneno: req.body.phoneno }).then(userdoc => {
        if (userdoc) {
            res.status(422).json({
                message: 'phone no is already exits!',
            });
            return
        }

    })
    const name = req.body.name;
    const phoneno = req.body.phoneno;
    const initialbalance = req.body.initialbalance;
    const post = new Post({
        name: name,
        phoneno: phoneno,
        initialbalance: initialbalance,
        creator: req.userId
    });
    post
        .save()
        .then(result => {
            res.status(201).json({
                message: 'account created successfully!',
                post: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getPost = (req, res, next) => {
    Post.find({ delete: false })
        .then(post => {
            res.status(200).json({ message: "Account fetched successfully.", post: post })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    console.log(postId)
    const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     const error = new Error('validation failed, entered data is incorrect.')
    //     error.statusCode = 200;
    //     throw error;

    // }
    const name = req.body.name;
    const phoneno = req.body.phoneno;
    const initialbalance = req.body.initialbalance;
    if (!name) {
        const error = new Error("name is not updated")
        error.statusCode = 422;
        throw error;
    }
    if (!phoneno) {
        const error = new Error("phoneno is not updated")
        error.statusCode = 422;
        throw error;
    }
    Post.findOne({ acno: postId })
        .then(post => {
            if (!post) {
                const error = new Error("could not find Account.")
                error.statusCode = 404;
                throw error;
            }
            if (post.creator.toString() !== req.userId) {
                const error = new Error("not Authorize")
                error.statusCode = 403;
                throw error
            }
            post.name = name;
            post.acno = postId;
            post.phoneno = phoneno;
            post.initialbalance = initialbalance;
            return post.save();
        })
        .then(result => {
            res.status(200).json({ message: "Account updated successfully.", post: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findOne({ acno: postId })
        .then(post => {
            if (!post) {
                const error = new Error("could not delete Account.")
                error.statusCode = 404;
                throw error;
            }
            if (post.creator.toString() !== req.userId) {
                const error = new Error("not Authorize")
                error.statusCode = 403;
                throw error

            }
            return post
        })
        .then(result => {
            if (!result.delete) {
                result.delete = true
                return result.save()

            }
            else {
                const error = new Error("Already deleted")
                error.statusCode = 403;
                throw error
            }

        })
        .then(result => {
            res.status(200).json({ message: "Account deleted successfully." })

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
