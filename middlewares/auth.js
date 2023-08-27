const AdminModel = require("../models/admin").AdminModel

const Auth = async (req,res,next)=>{
    
    if(req.headers.superuser == "1"){
        console.log("ok")
        const is_admin = await AdminModel.findOne({auth_token:req.headers.auth_token})
        if(is_admin){
            req.headers.admin_auth = true;
            next()
        }else{
            return res.status(401).json({msg:"You dont Have Permissin this Api",status:"Not Authentication"})
        }
    }else{
        req.headers.admin_auth = false;
        next()
    }
}

module.exports.auth = Auth