const express = require("express")
const { SellModel } = require("../../../models/sell")
const { RentModel } = require("../../../models/rent")
const { auth_erorr } = require("../../../utils/request_massege")
const { body,validationResult } = require("express-validator")
const app = express.Router()

app.get("/sell/get", async (req,res)=> {
    /*if(req.headers.admin_auth == true){
        const sellshopadmin_id = await SellModel.findById(req.headers.sellshop_id);
        if(!sellshopadmin_id){
            return res.status(404)
            .json({
                "msg": "Not found"
            });
        }
            res.json({
                data: sellshop_id
            })
        }else {
            if(){}
        }*/
    const sellshop_id = await SellModel.findById(req.headers.sellshop_id);
    if(!sellshop_id) 
    return res.status(404)
    .json({
        "msg": "Not found"
    })
    res.json({data: sellshop_id})
})


app.get("/sell/getall", async (req,res)=>{
    const pageNumber = req.headers.pageNumber;
    const pageSise = 10;
    if(req.headers.admin_auth == true){
        const sellshopadmin = await SellModel.find()
        .skip((pageNumber - 1) * pageSise)
        .limit(pageSise);
        res.json({
            data: sellshopadmin
        })
    }else{
        const sellshop = await SellModel.find({status: true})
        .skip((pageNumber - 1) * pageSise)
        .limit(pageSise);
        res.json({
            data: sellshop
        })
    }
})


app.post("/sell/add",[
    body("name","نام مغازه برای فروش را وارد کنید").notEmpty().isString(),
    body("tags","لطفا تگ های مغازه برای فروش را وارد کنید").notEmpty().isString(),
    body("feature","ویژگی های مغازه برای فروش خود را وارد کنید").notEmpty().isString(),
    body("price","قیمت مغازه برای فروش را وارد کنید").notEmpty(),
    body("status","وضعیت مغازه خود را انتاب کنید").notEmpty().isBolean()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.errors,});
    }
    if(req.headers.admin_auth == true){
        let sellshop = new SellModel({
            ...req.body
        })
        await sellshop.save()
        res.json({
            "status" : "Add shop for sell"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})


app.delete("/sell/delete", async (req,res)=>{
    if(req.headers.admin_auth){
        const sellshop = await SellModel.findByIdAndRemove(req.headers.sellshop_id);
        if(!sellshop){
            return res.status(404).json({
                "error": "the shop not found"
            })
        }
        res.status(200).json({"msg":"Deleted The shop"})
    }else{
        res.status(401).json(auth_erorr)
    }
})


app.put("/sell/update",[
    body("name","نام مغازه برای فروش را وارد کنید").notEmpty().isString(),
    body("tags","لطفا تگ های مغازه برای فروش را وارد کنید").notEmpty().isString(),
    body("feature","ویژگی های مغازه برای فروش خود را وارد کنید").notEmpty().isString(),
    body("price","قیمت مغازه برای فروش را وارد کنید").notEmpty(),
    body("status","وضعیت مغازه خود را انتاب کنید").notEmpty().isBolean()
],async(req,res)=>{
    if(req.headers.admin_auth){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({data: null, errors: errors, message: 'Have Error',yourdata:req.body});
        }
        const sellshop = await SellModel.findByIdAndUpdate(req.headers.sellshop_id, {
            ...req.body
        },{new: true});
        res.json({
            "msg": "Update successfull !"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})


// rent api


app.get("/rent/get", async (req,res)=> {
    const rentshop_id = await ShopModel.findById(req.headers.rentshop_id);
    if(!rentshop_id) 
    return res.status(404)
    .json({
        "msg": "Shop not found"
    })
    res.json({data: rentshop_id})
})


app.get("/rent/getall", async (req,res)=>{
    const pageNumber = req.headers.pageNumber;
    const pageSise = 10;
    if(req.headers.admin_auth == true){
        const rentshopadmin = await RentModel.find()
        .skip((pageNumber - 1) * pageSise)
        .limit(pageSise);
        res.json({
            data: rentshopadmin
        })
    }else{
        const rentshop = await RentModel.find({status: true})
        .skip((pageNumber - 1) * pageSise)
        .limit(pageSise);
        res.json({
            data: rentshop
        })
    }
})


app.post("/rent/add",[
    body("name","نام مغازه برای اجاره را وارد کنید").notEmpty().isString(),
    body("tags","لطفا تگ های مغازه برای اجاره را وارد کنید").notEmpty().isString(),
    body("feature","ویژگی های مغازه برای اجاره خود را وارد کنید").notEmpty().isString(),
    body("rent_price","قیمت مغازه برای اجاره را وارد کنید").notEmpty(),
    body("mortgage_price","قیمت مغازه برای رهن را وارد کنید").notEmpty(),
    body("status","وضعیت مغازه خود را انتخاب کنید").notEmpty().isBolean()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.errors,});
    }
    if(req.headers.admin_auth == true){
        let rentshop = new RentModel({
            ...req.body
        })
        await rentshop.save()
        res.json({
            "status" : "Add shop for rent"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})


app.delete("/rent/delete", async (req,res)=>{
    if(req.headers.admin_auth){
        const rentshop = await RentModel.findByIdAndRemove(req.headers.rentshop_id);
        if(!rentshop){
            return res.status(404).json({
                "error": "the shop not found"
            })
        }
        res.status(200).json({"msg":"Deleted The shop"})
    }else{
        res.status(401).json(auth_erorr)
    }
})


app.put("/rent/update",[
    body("name","نام مغازه برای اجاره را وارد کنید").notEmpty().isString(),
    body("tags","لطفا تگ های مغازه برای اجاره را وارد کنید").notEmpty().isString(),
    body("feature","ویژگی های مغازه برای اجاره خود را وارد کنید").notEmpty().isString(),
    body("rent_price","قیمت مغازه برای اجاره را وارد کنید").notEmpty(),
    body("mortgage_price","قیمت مغازه برای رهن را وارد کنید").notEmpty(),
    body("status","وضعیت مغازه خود را انتخاب کنید").notEmpty().isBolean()
],async(req,res)=>{
    if(req.headers.admin_auth){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({data: null, errors: errors, message: 'Have Error',yourdata:req.body});
        }
        const rentshop = await RentModel.findByIdAndUpdate(req.headers.rentshop_id, {
            ...req.body
        },{new: true});
        res.json({
            "msg": "Update successfull !"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})

module.exports.SellAndRent = app