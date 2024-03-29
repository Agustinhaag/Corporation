
const { conect } = require("../conect/conect");

const createRegister = async (body) => {
  const name = body.name + ' ' + body.surname
  const { email, password } = body;
  try {
    const [rows] = await conect.query("INSERT INTO perfiles SET ?", {
      name,
      email,
      password,
    });
    const userId = rows.insertId;
    const [result]= await conect.query("SELECT * FROM perfiles WHERE ?",{email})
    const newData = result[0];
    return newData;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
        return "registro existente";
      }
    throw error;
  } finally {
    conect.releaseConnection();
  }
};

const postLogin = async(req)=>{
    const {email}= req.body;
try {
    const [row] = await conect.query("SELECT * FROM perfiles WHERE ?", {email});
    console.log(row)
    return row;
} catch (error) {
    throw error
}finally{
    conect.releaseConnection()
}
}

module.exports = {
    createRegister,
    postLogin,
};
