const express = require("express")
const { AboutUsModel } = require("../../../models/aboutus")
const app = express.Router()
const { auth_erorr } = require("../../../utils/request_massege")

app.get('/get',async (req,res)=>{
    const AboutUs = await AboutUsModel.find()
    return res.json(AboutUs[AboutUs.length -1])
})

app.post("/add",async (req,res)=>{
    if(req.headers.admin_auth == true){
        let aboutus = new AboutUsModel({
            ...req.body
        })
        await aboutus.save()
        res.json({
            "status" : "Updated About Us"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})

module.exports.AboutUs = app