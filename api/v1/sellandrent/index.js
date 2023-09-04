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
    if(sellshop_id == null){ 
    return res.status(404)
    .json({
        "msg": "Not found"
    })}
    res.json(sellshop_id)
})


app.get("/sell/getall", async (req,res)=>{
    console.log(req.query.start_price)
    const sellshopadmin = await SellModel.find(
        {
            price : {$lte:(req.query.end_price == null?30000000000:req.query.end_price),$gte:(req.query.start_price == null?0:req.query.start_price)},
            name : (req.query.search==null?{"$ne" : null}:{"$regex" : req.query.search}),
            meterage : {$lte:(req.query.end_meterage == null?Number.POSITIVE_INFINITY:req.query.end_meterage),$gte:(req.query.start_meterage == null?0:req.query.start_meterage)},
            tags : (req.query.tags==null?{"$ne" : null}:{"$in" : req.query.tags})
        }
        
    ).sort((req.query.sort==null?{}:{price : req.query.sort }))
    res.json(sellshopadmin)
})

app.get("/sell/tags",async (req,res)=>{
    const tags_dup = await SellModel.find({},{tags:1,_id:0})
    var list_tags = []
    tags_dup.forEach((item)=>{
        list_tags.push(...item.tags)
    })
    var set_tags = [...new Set([...list_tags])]
    return res.json(set_tags)
})

app.post("/sell/add",[
    body("name","نام مغازه برای فروش را وارد کنید").notEmpty().isString(),
    body("tags","لطفا تگ های مغازه برای فروش را وارد کنید").notEmpty(),
    body("feature","ویژگی های مغازه برای فروش خود را وارد کنید").notEmpty(),
    body("price","قیمت مغازه برای فروش را وارد کنید").notEmpty(),
    body("address","آدرس را وارد کنید").notEmpty(),
],async (req,res)=>{
    const errors = validationResult(req);
    console.log(errors)
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
    body("tags","لطفا تگ های مغازه برای فروش را وارد کنید").notEmpty(),
    body("feature","ویژگی های مغازه برای فروش خود را وارد کنید").notEmpty(),
    body("price","قیمت مغازه برای فروش را وارد کنید").notEmpty(),
    body("address","آدرس را وارد کنید").notEmpty(),
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
    const rentshop_id = await RentModel.findById(req.headers.rentshop_id);
    if(rentshop_id == null){ 
    return res.status(404)
    .json({
        "msg": "Shop not found"
    })}
    res.json(rentshop_id)
})


app.get("/rent/getall", async (req,res)=>{
    const rentshopadmin = await RentModel.find(
        {
            rent_price : {$lte:(req.query.end_rent_price == null?3000000000000000:req.query.end_rent_price),$gte:(req.query.start_rent_price == null?0:req.query.start_rent_price)},
            mortgage_price : {$lte:(req.query.end_mortgage_price == null?30000000000000000:req.query.end_mortgage_price),$gte:(req.query.start_mortgage_price == null?0:req.query.start_mortgage_price)},
            name : (req.query.search==null?{"$ne" : null}:{"$regex" : req.query.search}),
            meterage : {$lte:(req.query.end_meterage == null?Number.POSITIVE_INFINITY:req.query.end_meterage),$gte:(req.query.start_meterage == null?0:req.query.start_meterage)},
            tags : (req.query.tags==null?{"$ne" : null}:{"$in" : req.query.tags})
        }
    )
    res.json(rentshopadmin)
})


app.post("/rent/add",[
    body("name","نام مغازه برای فروش را وارد کنید").notEmpty().isString(),
    body("tags","لطفا تگ های مغازه برای فروش را وارد کنید").notEmpty(),
    body("feature","ویژگی های مغازه برای فروش خود را وارد کنید").notEmpty(),
    body("rent_price","قیمت اجاره مغازه برای فروش را وارد کنید").notEmpty(),
    body("mortgage_price","قیمت رهن مغازه برای فروش را وارد کنید").notEmpty(),
    body("address","آدرس را وارد کنید").notEmpty(),
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
    body("name","نام مغازه برای فروش را وارد کنید").notEmpty().isString(),
    body("tags","لطفا تگ های مغازه برای فروش را وارد کنید").notEmpty(),
    body("feature","ویژگی های مغازه برای فروش خود را وارد کنید").notEmpty(),
    body("rent_price","قیمت اجاره مغازه برای فروش را وارد کنید").notEmpty(),
    body("mortgage_price","قیمت رهن مغازه برای فروش را وارد کنید").notEmpty(),
    body("address","آدرس را وارد کنید").notEmpty(),
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

app.get("/rent/tags",async (req,res)=>{
    const tags_dup = await RentModel.find({},{tags:1,_id:0})
    var list_tags = []
    tags_dup.forEach((item)=>{
        list_tags.push(...item.tags)
    })
    var set_tags = [...new Set([...list_tags])]
    return res.json(set_tags)
})

module.exports.SellAndRent = app