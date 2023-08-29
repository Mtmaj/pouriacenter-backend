const AdminModel = require("../models/admin").AdminModel
const { auth_erorr } = require("../utils/request_massege")
const Auth = async (req,res,next)=>{
    
    if(req.headers.superuser == "1"){
        const is_admin = await AdminModel.findOne({auth_token:req.headers.auth_token})
        if(is_admin != null){
            req.headers.admin_auth = true;
            next()
        }else{
            return res.status(401).json(auth_erorr)
        }
    }else{
        req.headers.admin_auth = false;
        next()
    }
}

module.exports.auth = Auth