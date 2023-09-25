const { conect } = require("../conect/conect");

const createRegister = async (body) => {
  const { name, surname, email, password } = body;
  try {
    const [rows] = await conect.query("INSERT INTO usuarios SET ?", {
      name,
      surname,
      email,
      password,
    });
    const userId = rows.insertId;
    return userId;
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
    const [row] = await conect.query("SELECT * FROM usuarios WHERE ?", {email});
    return row
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
