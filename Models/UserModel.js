const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    email : String,
    password : String,
    name : String,
    age :Number
});
const Usermodel = mongoose.model("User-nem",userschema)
module.exports ={
    Usermodel
}