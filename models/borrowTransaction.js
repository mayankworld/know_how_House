// //models >> books.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Books Schema
let TransactionSchema = new Schema({
    book_name:{
        type: String,
        required: true
    },
    student_name: {
        type: String,
        required: true
    },
    date_borrow:{
        type: String, 
        required: true
    },
    date_return:{
        type: String, 
        required: true
    },
    status:{
        type:String,
        required:true
    }
});

// // Export the model
module.exports = Transaction = mongoose.model('Transaction', TransactionSchema)

