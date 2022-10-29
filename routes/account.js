const express = require('express');
const { body } = require('express-validator');
const feedcontroler = require('../controler/account')
const Phone = require("../models/post")
const router = express.Router()

const is_user_account = require("../middleware/is_user_account")
router.post('/post', is_user_account,
  [
    body("phoneno")
      .isMobilePhone()
     
      .withMessage("please enter valid phone number."),

    body('name')
      .trim()
      .isLength({ min: 4 }),
    body('initialbalance')
      .trim()
      .isLength(3)
  ],
  feedcontroler.createaccount)


router.get('/post', is_user_account, feedcontroler.getPost)
router.put('/post/:postId',is_user_account, [
  body('name')
    .trim()
    .isLength({ min: 1 }),
  body('acno')
    .trim()
    .isLength(12),
  body('phoneno')
    .trim()
    .isLength(10),
  body('initialbalance')
    .trim()
    .isLength(3)

], feedcontroler.updatePost)
router.delete('/post/:postId', is_user_account, feedcontroler.deletePost)

module.exports = router;