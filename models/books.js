// //models >> books.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Books Schema
let BooksSchema = new Schema({
    book_id:{
        type: Number,
        required: true
    },
    book_name: {
        type: String,
        required: true, 
        max: 100
    },
    author_name:{
        type: String, 
        required: true
    },
    book_cat:{
        type: String, 
        required: true
    },
    quantity:{
        type: Number, 
        required: true
    },
    publisher:{
        type: String, 
        required: true
    },
    book_description:{
        type: String, 
        required: true
    },
    editedBy:{
        type:Object,
        default: {
            "name":"Admin"
        }
    }
});


// // Export the model
module.exports = Book = mongoose.model('books', BooksSchema)

