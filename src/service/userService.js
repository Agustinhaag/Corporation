const modelo = require("../model/userModel")

const guardar = async(body,file)=>{
const result = await modelo.guardar(body,file)
return result
}

const findOne = async(params)=>{
    const result = await modelo.findOne(params)
    return result
    }
const borrar = async (params)=>{
  const user = await modelo.borrar(params)
  return user;
}
module.exports = {
guardar,
borrar,
findOne,
}