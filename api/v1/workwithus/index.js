const express = require("express")
const { WorkWithUsModel } = require("../../../models/workwithus")
const app = express.Router()
const { auth_erorr } = require("../../../utils/request_massege")
const { body,validationResult } = require("express-validator")

app.get("/get",async (req,res)=>{
    if(req.headers.admin_auth == true){
        const WorkWithUsMessages = await WorkWithUsModel.find()
        return res.json(WorkWithUsMessages)
    }else{
        return res.status(401).json(auth_erorr)
    }

})

app.post("/new",[
    body("full_name","لطفا نام و نام خانوادگی را وارد کنید").notEmpty().isString(),
    body("phone_number","شماره تلفن خود را وارد کنید").isMobilePhone(),
    body("email","فیلد ایمیل اجباریست").isEmail(),
    body("text","پیام خود را وارد کنید").notEmpty().isString()
],async (req,res)=>{
    const error = validationResult(req)
    if(error.isEmpty()){
        const NewMessage = new WorkWithUsModel(
            {
                ...req.body
            }
        )
        await NewMessage.save()
        return res.json({
            "status" : "accepted",
            "msg" : "پیغام شما برای مدیریت ارسال شد"
        })
    }else{
        return res.status(400).json({
            "error" : error.errors,
            "msg" : "Bad Request Data",
        })
    }
    
})

module.exports.WorkWithUs = app