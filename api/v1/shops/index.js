const express = require("express")
const { ShopModel } = require("../../../models/shop")
const app = express.Router()
const { auth_erorr } = require("../../../utils/request_massege")
const { body,validationResult } = require("express-validator")


app.get("/get", async (req,res)=> {
    const shop_id = await ShopModel.findById(req.headers.shop_id);
    if(!shop_id) 
    return res.status(404)
    .json({
        "msg": "Shop not found"
    })
    res.json({data: shop_id})
})


app.get("/getall", async (req,res)=>{
    const pageNumber = req.headers.pageNumber;
    const pageSise = 10;
    const shop = await ShopModel.find()
    .skip((pageNumber - 1) * pageSise)
    .limit(pageSise);
    res.json({
        data: shop
    })
})


app.post("/add",[
    body("name","اسم مغازه را وارد کنید").notEmpty().isString(),
    body("category","دسته بندی مغازه را وارد کنید").notEmpty().isString(),
    body("floor","طبقه مغازه را وارد کنید").notEmpty().isString(),
    body("tags","تگ های مغازه را با استفاده از | جدا کنید").notEmpty().isString(),
    body("description","اطلاعات و توضیحات مغازه را وارد کنید").notEmpty().isString(),
    body("address","موقعیت و ادرس مغازه را وارد کنید").notEmpty().isString()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.errors,});
    }
    if(req.headers.admin_auth == true){
        let shop = new ShopModel({
            ...req.body
        })
        await shop.save()
        res.json({
            "status" : "Add the Shop successfully"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})


app.delete("/delete", async (req,res)=>{
    if(req.headers.admin_auth){
        const shop = await ShopModel.findByIdAndRemove(req.headers.shop_id);
        if(!shop){
            return res.status(404).json({
                "error": "The shop was not found"
            })
        }
        res.status(200).json({"msg":"The shop has been removed successfully"})
    }else{
        res.status(401).json(auth_erorr)
    }
})


app.put("/update",[
    body("name","اسم مغازه را وارد کنید").notEmpty().isString(),
    body("category","دسته بندی مغازه را وارد کنید").notEmpty().isString(),
    body("floor","طبقه مغازه را وارد کنید").notEmpty().isString(),
    body("tags","تگ های مغازه را با استفاده از | جدا کنید").notEmpty().isString(),
    body("description","اطلاعات و توضیحات مغازه را وارد کنید").notEmpty().isString(),
    body("address","موقعیت و ادرس مغازه را وارد کنید").notEmpty().isString()
],async(req,res)=>{
    if(req.headers.admin_auth){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({data: null, errors: errors, message: 'Have Error',yourdata:req.body});
        }
        const shop = await NewsModel.findByIdAndUpdate(req.headers.shop_id, {
            ...req.body
        },{new: true});
        res.json({
            "msg": "Update successfull !"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})


app.get("")
module.exports.Shop = app