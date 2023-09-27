const modelo = require("../model/userModel")

const guardar = async(body,file)=>{
const result = await modelo.guardar(body,file)
return result
}

const findOne = async(params)=>{
    const result = await modelo.findOne(params)
    return result
    }

module.exports = {
guardar,
findOne,
}