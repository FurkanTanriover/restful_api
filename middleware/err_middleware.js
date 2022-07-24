const e = require("express");

const catchError=(err,req,res, next)=>{
    if(err.code===11000){
        console.log(err);
        res.json({
            errorCode:err.statusCode,
            message:`${Object.values(err.keyValue)} değeri önceden alınmış`
        }
        )
    }
    res.json({
        errorCode:err.statusCode,
        message:err.message
    })
}

module.exports=catchError;