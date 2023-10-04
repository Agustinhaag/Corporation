const { conect } = require("../conect/conect");

const findAll = async ()=>{
try {
    const [rows] = await conect.query("SELECT * FROM perfiles LIMIT 3")
    console.log(rows)
    return rows;
} catch (error) {
    throw error
}finally{
    conect.releaseConnection()
}
}

module.exports = {
findAll,
}