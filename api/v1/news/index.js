const express = require("express")
const { NewsModel } = require("../../../models/news")
const app = express.Router()
const { auth_erorr } = require("../../../utils/request_massege")
const { body,validationResult } = require("express-validator")


app.get("/get", async (req,res)=> {
    const news_id = await News.findById(req.headers.new_id);
    if(!new_id) 
    return res.status(404)
    .json({
        "msg": "New not found"
    })
    res.json({data: news_id})
})


app.get("/getall", async (req,res)=>{
    const pageNumber = req.headers.pageNumber;
    const pageSise = 10;
    const news = await NewsModel.find()
    .skip((pageNumber - 1) * pageSise)
    .limit(pageSise);
    res.json({
        data: news
    })
})


app.post("/add",[
    body("title","لطفا تایتل یا تیتر خبر خود را وارد کنید").notEmpty().isString(),
    body("text1","لطفا متن 1 خود را وارد کنید").notEmpty().isString(),
    body("text2","لطفا متن 2 خود را وارد کنید").notEmpty().isString()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({data: null, errors: errors, message: 'Have Error',yourdata:req.body});
    }
    if(req.headers.admin_auth == true){
        let news = new NewsModel({
            ...req.body
        })
        await news.save()
        res.json({
            "status" : "Updated News"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})


app.delete("/delete", async (req,res)=>{
    const news = await NewsModel.findByIdAndRemove(req.headers.new_id);
    if(!news){
        return res.status(404).json({
            "error": "the news not found"
        })
    }
})

app.put("/update",[
    body("title","لطفا تایتل یا تیتر خبر خود را وارد کنید").notEmpty().isString(),
    body("text1","لطفا متن 1 خود را وارد کنید").notEmpty().isString(),
    body("text2","لطفا متن 2 خود را وارد کنید").notEmpty().isString()
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({data: null, errors: errors, message: 'Have Error',yourdata:req.body});
    }

    const news = await NewsModel.findByIdAndUpdate(req.headers.update_news_id, {
        title: req.body.title,
        images: req.body.images,
        text1: req.body.text1,
        text2: req.body.text2
    },{new: true});
    
    res.json({
        "msg": "Update successfull !"
    })
})
module.exports.News = app