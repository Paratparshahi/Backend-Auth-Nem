const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost:27017/Pratik_Private');

module.exports={connection}