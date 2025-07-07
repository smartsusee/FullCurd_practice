const express = require('express');

const app = express();

const mongoose = require('mongoose');

const employeeSchema = require("./controller/middleware/EmployeeSchema")

const dotenv = require('dotenv');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const router = require('./router/router');

dotenv.config()
app.use(express.json())
app.use("/apiHandle", router)
mongoose.connect(process.env.DB)
.then(()=>{

      console.log("DB is connected");
      
}).
catch(()=>{

      console.log("DB is not connected");
      
})



app.post("/UserDataCreate", async (req , res)=>{
    try{
         let {name , email , password} = req.body;
    console.log(name , email , password);

    let hassPassword = await bcrypt.hash(password, 7)

      let existingEmail = await employeeSchema.findOne({email:email})

      if(existingEmail) return res.status(200).json({msg:"email already exist"})
      
    const data = await new employeeSchema({
     ...req.body , password:hassPassword
    }) 



  let SaveData =   await data.save()

  res.status(200).json({msg:"data reg Successfully...!" , SaveData})
    }
    
    catch(err){


           res.status(500).json(err)
    }
    

})


app.put("/UserDataUpdate/:id", async (req, res)=>{
    console.log(req.params.id);
    

      let {id} = req.params 
    let updatedata = await employeeSchema.findByIdAndUpdate(id , req.body, {new:true})

    res.json({msg:"data updated successfully....!", updatedata})

})
app.delete("/UserDatadelete/:id", async (req, res)=>{
    console.log(req.params.id);
    

      let {id} = req.params 
    let deleteData = await employeeSchema.findByIdAndDelete(id)

    res.json({msg:"data deleted successfully....!", deleteData})

})


// app.get("/UserDataGet", async(req , res)=>{

//   let getData = await employeeSchema.find()

//   res.json({getData})
// })



app.post("/loginMethod" , async (req , res)=>{

    console.log(req.body);
    
  try{

     let existingEmail = await employeeSchema.findOne({email:req.body.email})

console.log(existingEmail);

if(!existingEmail) return res.status(404).json({msg:"email not found"})


    let checkpassword = await bcrypt.compare(req.body.password , existingEmail.password)

if(!checkpassword) return res.status(404).json({msg:"password not found"})


      let Token = await jwt.sign({ name:existingEmail.name , email:existingEmail.email }, process.env.ragasiyam , {expiresIn:"1h"})


    res.status(200).json({msg:"login successfully" , Token})

      if(!token) return res.status(404).json({msg:"token not found"})

  }


  catch(err){

    res.status(500).json(err)

  }


})


app.listen(process.env.Port , ()=>{

    console.log(`server running port on :${process.env.Port}`);
    
})