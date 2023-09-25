const { conect } = require("../conect/conect");
const moment = require("moment");

const guardar = async (body,file) => {
    let edad = parseInt(body.edad);
    let telefono = parseInt(body.telefono);
  let cv = file ? file.filename : null;
  let descripcion = body.descripcion ? body.descripcion : null;
  const {
    name,
    email,
    genero,
    caracteristica,
    estudios,
    titulo,
    trabajo,
    pais,
    provincia,
    domicilio,
  } = body;
  const fecha = body.nacimiento;
  const nacimiento = moment(fecha).format("YYYY-MM-DD");
  try {
    const [rows] = await conect.query("INSERT INTO perfiles SET ?", {
      name,
      email,
      edad,
      genero,
      caracteristica,
      telefono,
      estudios,
      titulo,
      trabajo,
      descripcion,
      cv,
      pais,
      provincia,
      domicilio,
      nacimiento,
    });
    return rows;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return "registro existente";
    }
    console.error(error);
    throw error;
  } finally {
    conect.releaseConnection();
  }
};

module.exports = {
  guardar,
};
