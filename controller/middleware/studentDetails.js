const mongoose = require('mongoose');

const StudentSchema =  mongoose.Schema({

     Firstname:String, 
     Lastname:String, 


})

module.exports = mongoose.model('Student', StudentSchema);