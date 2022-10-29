//const { Schema, model, Types } = require("mongoose");

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema(
    {
    
        amount: {
            type: Number,
            require: true,
        },
        accountholdername: {
            type: String,
            required: true,
        },
        acno: {
            type: Number,
            require: true
        },
        type: {
            type: String,
            enum: ["Debit", "Credit",],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);