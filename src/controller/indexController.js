const {validationResult} = require("express-validator")
const service = require("../service/indexService")

const index = (req,res)=>{
    res.render("index.ejs",{values:{}, errors:[]})
}

const enviar = async(req,res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.render("index.ejs",{
        values:req.body,
        errors:errors.array()
    })
  }else{
    const sendEmail = await service.postEmail(req.body)
    res.redirect("/sucess")
  }
}

const sucess = (req,res)=>{
res.render("sucess.ejs")
}

module.exports = {
    index,
    enviar,
    sucess,
}