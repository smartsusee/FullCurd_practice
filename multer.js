const express = require('express');
const { default: mongoose } = require('mongoose');
const multer = require('multer');
const path = require("path")
const app = express()
const dotenv = require('dotenv')
dotenv.config()



mongoose.connect(process.env.DBMulter)
.then(()=>{
   console.log("DB is connected");
   
})
.catch(()=>{
   console.log("DB not is connected");
   
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname , "imageUpload"))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname+"-"+file.originalname)
  }
})

const upload = multer({ storage })



const imgSchema =  mongoose.Schema({

    name : String,
    img:String,
    

})

const imgModelschema = mongoose.model("imgCollection" , imgSchema)




app.post("/imgUpload" , upload.single("img"), async(req, res)=>{

 try{

    console.log(req.file.filename);

      let ImgFile = req.file ? req.file.filename : null;
    console.log(ImgFile);

    let {name } = req.body

       const data =await new  imgModelschema({
        name, 
        img: ImgFile
       })



       const dataSave  = await data.save()

         res.status(200).json({
            message:"file Uploaded successfully.....! ",
            data:dataSave
         })
    
 }
 catch(err){

      res.json(err)
 }

    
      
})


app.listen(4000 , ()=>{

      console.log("server create : 4000");
      
})