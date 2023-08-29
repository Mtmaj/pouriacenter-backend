const express = require("express")
const { ContactUsModel } = require("../../../models/contactus")
const app = express.Router()
const { auth_erorr } = require("../../../utils/request_massege")

app.get('/get',async (req,res)=>{
    const ContactUS = await ContactUsModel.find()
    return res.json(ContactUS.last())
})

app.post("/add",async (req,res)=>{
    if(req.headers.admin_auth == true){
        let contactus = new ContactUsModel({
            ...req.body
        }) 
        await contactus.save()
        res.json({
            "status" : "Updated Contact Us"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})

module.exports.ContactUS = app