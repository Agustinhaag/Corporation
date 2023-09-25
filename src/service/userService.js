const modelo = require("../model/userModel")

const guardar = async(body,file)=>{
const result = await modelo.guardar(body,file)
return result
}

module.exports = {
guardar,
}