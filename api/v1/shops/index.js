const express = require("express")
const { ShopModel } = require("../../../models/shop")
const app = express.Router()
const { auth_erorr } = require("../../../utils/request_massege")
const { body,validationResult } = require("express-validator")


app.get("/get", async (req,res)=> {
    const shop_id = await ShopModel.findById(req.headers.shop_id);
    if(shop_id == null){ 
    return res.status(404)
    .json({
        "msg": "Shop not found"
    })}
    res.json(shop_id)
})


app.get("/getall", async (req,res)=>{
    const pageNumber = req.headers.pageNumber;
    console.log(req.query)
    const shop = await ShopModel.find(
        {
            floor: (req.query.floor==null?{"$ne" : null}:req.query.floor),
            category : (req.query.categorys==null?{"$ne" : null}:{"$in" : req.query.categorys}),
            tags : (req.query.tags==null?{"$ne" : null}:{"$in" : req.query.tags}),
            name : (req.query.search==null?{"$ne" : null}:{"$regex" : req.query.search}),
            is_brand:(req.query.is_brand==null?{"$ne" : null}:req.query.is_brand)
        }
    )
    res.json(shop)
})


app.post("/add",[
    body("name","اسم مغازه را وارد کنید").notEmpty().isString(),
    body("category","دسته بندی مغازه را وارد کنید").notEmpty().isString(),
    body("floor","طبقه مغازه را وارد کنید").notEmpty(),
    body("tags","تگ های مغازه را با استفاده از | جدا کنید").notEmpty(),
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
        if(shop == null){
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
    body("floor","طبقه مغازه را وارد کنید").notEmpty(),
    body("tags","تگ های مغازه را با استفاده از | جدا کنید").notEmpty(),
    body("description","اطلاعات و توضیحات مغازه را وارد کنید").notEmpty().isString(),
    body("address","موقعیت و ادرس مغازه را وارد کنید").notEmpty().isString()
],async(req,res)=>{
    if(req.headers.admin_auth){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({data: null, errors: errors, message: 'Have Error',yourdata:req.body});
        }
        const shop = await ShopModel.findByIdAndUpdate(req.headers.shop_id, {
            ...req.body
        },{new: true});
        res.json({
            "msg": "Update successfull !"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})

app.get("/get-categorys",async (req,res)=>{
    const shops = await ShopModel.find()
    var categorys = []
    for(var i = 0;i<shops.length;i++){
        
        var is_have = false
        var index = 0
        for(var j = 0;j<categorys.length;j++){
            if(categorys[j].name == shops[i].category){
                is_have = true
                index = j
                break
            }
        }
        if(is_have == false){
            
            categorys.push(
                {
                    name : shops[i].category,
                    tags : [...shops[i].tags]
                }
            )
        }else{
            categorys[index].tags = [...new Set([...categorys[index].tags,...shops[i].tags])] 
        }
    }
    res.json(categorys)
})


module.exports.Shop = app