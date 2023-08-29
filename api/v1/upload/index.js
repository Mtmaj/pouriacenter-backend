const express = require("express")
const short = require("short-uuid")
const app = express.Router()
var multer = require('multer');
const uuidg = short()
const path = require("path")
const { auth_erorr } = require("../../../utils/request_massege")


const stroge = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"Images")
    },
    filename : (req,file,cb)=>{
        console.log(file)
        img_id = uuidg.generate() + "." + file.mimetype.split("/")[1]
        cb(null,img_id)
    },
})

var upload = multer({storage : stroge}).single("image");


app.post('/image',(req,res)=>{
    if(req.headers.admin_auth){
        upload(req,res,(err)=>{
            if(err){
                return res.status(400)
            }
            res.json({
                "img_url" : '127.0.0.1:5000/' + img_id
            });
        })
        
    }else{
        res.status(401).json(auth_erorr)
    }
    // All good
    
})

module.exports.Upload = app