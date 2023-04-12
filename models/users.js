//models >> users.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
let UserSchema = new Schema({
    name: {
        type: String,
        required: true, 
        max: 100
    },
    school_id: {
        type: String, 
        max: 100
    },
    email:{
        type: String, 
        required: true
    },
    password:{
        type: String
    },
    confirmPassword:{
        type: String
    },
    gender:{
        type:String,
        required: true
    },
    phoneNo:{
        type:Number,
        required: true
    },
    address:{
        type:String
    },
    stu_department:{
        type:String
    },
    stu_course:{
        type:String
    },
    role: {
        type: String
    }
});


// Export the model
module.exports = mongoose.model('users', UserSchema);