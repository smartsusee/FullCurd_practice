const express = require('express');
const multer = require('multer');
const path = require("path")
const app = express()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname , "imageUpload"))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname+"-"+file.originalname)
  }
})

const upload = multer({ storage })

// path.join(__dirname, 'app')
app.post("/imgUpload" , upload.single("img"), async(req, res)=>{

// console.log(req);
 try{

    res.json("file uploaded successfully")
 }
 catch(err){

      res.json(err)
 }

    
      
})


app.listen(4000 , ()=>{

      console.log("server create : 4000");
      
})