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

module.exports.Shop = app