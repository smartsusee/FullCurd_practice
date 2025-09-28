const express = require("express");

const app = express();

const mongoose = require("mongoose");

// const employeeSchema = require("./controller/middleware/EmployeeSchema")

const StudentSchema = require("./controller/middleware/studentDetails");
const dotenv = require("dotenv");

// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');
// const router = require('./router/router');
const cors = require("cors");
app.use(cors());
dotenv.config();
app.use(express.json());
// app.use("/apiHandle", router)
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB is connected");
  })
  .catch(() => {
    console.log("DB is not connected");
  });

app.post("/studentCreate", async (req, res) => {
  const data = new StudentSchema({
    ...req.body,
  });

  let SaveData = await data.save();

  res.json({ msg: "data saved successfully", SaveData });
});

app.get("/studentGet", async (req, res) => {
  let dataget = await StudentSchema.find();

  res.json(dataget);
});

app.put("/studentUpdate/:id", async (req, res) => {
  let updatedata = await StudentSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ msg: "data updated successfully", updatedata });
});

app.delete("/studentDelete/:id", async (req, res) => {
  let DeleteData = await StudentSchema.findByIdAndDelete(req.params.id);

  res.status(200).json({ msg: "data Deleted successfully", DeleteData });
});

// app.post("/UserDataCreate", async (req , res)=>{
//     try{
//          let {name , email , password} = req.body;
//     console.log(name , email , password);

//     let hassPassword = await bcrypt.hash(password, 7)

//       let existingEmail = await employeeSchema.findOne({email:email})

//       if(existingEmail) return res.status(200).json({msg:"email already exist"})

//     const data = await new employeeSchema({
//      ...req.body , password:hassPassword
//     })

//   let SaveData =   await data.save()

//   res.status(200).json({msg:"data reg Successfully...!" , SaveData})
//     }

//     catch(err){

//            res.status(500).json(err)
//     }

// })

// app.put("/UserDataUpdate/:id", async (req, res)=>{
//     console.log(req.params.id);

//       let {id} = req.params
//     let updatedata = await employeeSchema.findByIdAndUpdate(id , req.body, {new:true})

//     res.json({msg:"data updated successfully....!", updatedata})

// })
// app.delete("/UserDatadelete/:id", async (req, res)=>{
//     console.log(req.params.id);

//       let {id} = req.params
//     let deleteData = await employeeSchema.findByIdAndDelete(id)

//     res.json({msg:"data deleted successfully....!", deleteData})

// })

// async function VerifyTokenValidate(req, res , next ) {
//   try{

//    let Token = req.headers["authorization"].split(" ")[1]

//      if(!Token) return res.status(404).json({msg:"you'r token missing "})

//       let verifytoken =  jwt.verify(Token,  process.env.ragasiyam)

//       if(!verifytoken) return res.status(404).json({msg:"you'r token is invalid"})

//          req.user = verifytoken

//             next()

//   }
//   catch(err){

//     res.status(500).json(err)
//   }
//   // console.log();

// }

// app.get("/UserDataGet",VerifyTokenValidate, async(req , res)=>{

//   console.log(req.user.role);

//   //   if(req.user.role !== "admin"){
//   //       res.status(500).json({msg:"you'r not admin"})

//   //   }
//   //   else{
//   //     let getData = await employeeSchema.find()

//   // res.json({getData})

//   //   }
//     if(req.user.role === "admin"){
//  let getData = await employeeSchema.find()

//   res.json({getData})
//     }
//     else{

//         res.status(500).json({msg:"you'r not admin"})
//     }

// })

// app.post("/loginMethod" , async (req , res )=>{

//     console.log(req.body);

//   try{

//      let existingEmail = await employeeSchema.findOne({email:req.body.email})

// console.log(existingEmail);

// if(!existingEmail) return res.status(404).json({msg:"email not found"})

//     let checkpassword = await bcrypt.compare(req.body.password , existingEmail.password)

// if(!checkpassword) return res.status(404).json({msg:"password not found"})

//       let Token = await jwt.sign({ name:existingEmail.name , email:existingEmail.email , role:existingEmail.role}, process.env.ragasiyam , {expiresIn:"1h"})

//     res.status(200).json({msg:"login successfully" , Token})

//   }

//   catch(err){

//     res.status(500).json(err)

//   }

// })

app.listen(process.env.Port, () => {
  console.log(`server running port on :${process.env.Port}`);
});
