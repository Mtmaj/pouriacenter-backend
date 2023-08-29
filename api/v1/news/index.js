const express = require("express")
const { NewsModel } = require("../../../models/news")
const app = express.Router()
const { auth_erorr } = require("../../../utils/request_massege")
const { body,validationResult } = require("express-validator")


app.get("/get", async (req,res)=> {
    const news_id = await NewsModel.findOne({code : req.headers.news_id});
    if(!news_id) 
    return res.status(404)
    .json({
        "msg": "New not found"
    })
    res.json({data: news_id})
})


app.get("/getall", async (req,res)=>{
    const pageNumber = req.headers.pageNumber;
    const pageSise = 10;
    const news = await NewsModel.find({is_general : req.headers.is_general})
    .skip((pageNumber - 1) * pageSise)
    .limit(pageSise);
    res.json({
        data: news
    })
})


app.post("/add",[
    body("title","تایتل یا تیتر خبر خود را وارد کنید").notEmpty().isString(),
    body("text1","متن 1 خود را وارد کنید").notEmpty().isString(),
    body("text2","متن 2 خود را وارد کنید").notEmpty().isString(),
    body("is_general","نوع خبر خود را اتخاب کنید").isBoolean()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.errors,});
    }
    const is_code = NewsModel.findOne({code:req.body.code})
    if(is_code)
    return res.status(400).json({"msg":"کد وارد شده تکراری می باشد"})
    if(req.headers.admin_auth == true){
        let news = new NewsModel({
            ...req.body
        })
        await news.save()
        res.json({
            "status" : "Add News"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})


app.delete("/delete", async (req,res)=>{
    if(req.headers.admin_auth){
        const news = await NewsModel.findByIdAndRemove(req.headers.news_id);
        if(!news){
            return res.status(404).json({
                "error": "the news not found"
            })
        }
        res.status(200).json({"msg":"Deleted The news"})
    }else{
        res.status(401).json(auth_erorr)
    }
})

app.put("/update",[
    body("title","لطفا تایتل یا تیتر خبر خود را وارد کنید").notEmpty().isString(),
    body("text1","لطفا متن 1 خود را وارد کنید").notEmpty().isString(),
    body("text2","لطفا متن 2 خود را وارد کنید").notEmpty().isString(),
    body("is_general","نوع خبر خود را انتخاب کنید").isBoolean()
],async(req,res)=>{
    if(req.headers.admin_auth){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({data: null, errors: errors, message: 'Have Error',yourdata:req.body});
        }

        const news = await NewsModel.findByIdAndUpdate(req.headers.news_id, {
            ...req.body
        },{new: true});
        
        res.json({
            "msg": "Update successfull !"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})


module.exports.News = app