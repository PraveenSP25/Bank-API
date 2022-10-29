const express = require('express');
const { body } = require('express-validator');
const transactioncontroler = require('../controler/transaction')
const is_user_account = require("../middleware/is_user_account")
const router = express.Router()

router.put('/credit/:postId', is_user_account,
    [
        body('accountholdername')
            .trim()
            .isLength({ min: 0 }),
        body('amount')
            .trim()
            .isLength({ min: 3 }),
        body('acno')
            .trim()
            .isLength(12),
        body('type')
            .trim()
            .isLength({ min: 4 })
    ],
    transactioncontroler.creditbalance
)
router.put('/debit/:postId', is_user_account,
    [
        body('accountholdername')
            .trim()
            .isLength({ min: 0 }),
        body('amount')
            .trim()
            .isLength({ min: 3 }),
        body('acno')
            .trim()
            .isLength(12),
        body('type')
            .trim()
            .isLength({ min: 4 })
    ],
    transactioncontroler.debitbalance
)
router.get('/balance/:postId', is_user_account, transactioncontroler.getbalance)

module.exports = router;

