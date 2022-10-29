
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoincrement=require("mongoose-auto-increment")
const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    acno: {
        type: String,
        required: false

    },
    phoneno: {
        type: Number,
        required: true
    },
    initialbalance: {
        type: Number,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref:"Post",
        required:false
    },
    delete:{
        type:Boolean,
        required:false,
        default:false
    }
},

    { timestamps: true }

);

autoincrement.initialize(mongoose.connection)
postSchema.plugin(autoincrement.plugin,{model:"Posts",field:"acno",
startAt:100000000000,incrementBy:2})
module.exports = mongoose.model('Posts', postSchema);
