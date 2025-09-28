const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true,

    },

    email:{
        type: String,
        required:true,

    },

    password:{
        type: String,
        required:true,

    },
    address:{
        type: String,
        required:true,

    },
    role:{
        type: String,
        required:true,
        default:"user"
       
    }

})


module.exports = mongoose.model("Fronetnd_dev" , employeeSchema)

