const { conect } = require("../conect/conect");
const moment = require("moment");


const guardar = async (body, file) => {
  let edad = parseInt(body.edad);
  let telefono = parseInt(body.telefono);
  let cv = file ? file.filename : null;
  let descripcion = body.descripcion ? body.descripcion : null;
  let habilidades = body.habilidades ? body.habilidades : null;
  let redes = body.redes ? body.redes : null;
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
    civil,
    linkedin,
    estado,
    nacionalidad
  } = body;
  const fecha = body.nacimiento;
  const nacimiento = moment(fecha).format("YYYY-MM-DD");
  try {
    const [rows] = await conect.query("UPDATE perfiles SET ? WHERE ?", [
      {
        name,
        email,
        edad,
        genero,
        caracteristica,
        telefono,
        habilidades,
        estudios,
        titulo,
        trabajo,
        descripcion,
        cv,
        pais,
        provincia,
        civil,
        estado,
        linkedin,
        nacionalidad,
        nacimiento,
        redes,
      },
      { email },
    ]);
    const [data] = await conect.query("SELECT * FROM perfiles WHERE ?", {
      email,
    });
    const newData = data[0];
    console.log(newData)
    return newData;
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

const findOne = async (params) => {
  const { id } = params;
  try {
    const [data] = await conect.query("SELECT * FROM perfiles WHERE ?", { id });
    const newData = data[0];
    return newData;
  } catch (error) {
    throw error;
  } finally {
    conect.releaseConnection();
  }
};

const update = async(body,file)=>{
  let edad = parseInt(body.edad);
  let telefono = parseInt(body.telefono);
  let cv = file ? file.filename : null;
  let descripcion = body.descripcion ? body.descripcion : null;
  let habilidades = body.habilidades ? body.habilidades : null;
  let redes = body.redes ? body.redes : null;
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
    civil,
    linkedin,
    estado,
    nacionalidad,
    id,
  } = body;
  const fecha = body.nacimiento;
  const nacimiento = moment(fecha).format("YYYY-MM-DD");
  try {
    const [rows] = await conect.query("UPDATE perfiles SET ? WHERE ?", [
      {
        name,
        email,
        edad,
        genero,
        caracteristica,
        telefono,
        habilidades,
        estudios,
        titulo,
        trabajo,
        descripcion,
        cv,
        pais,
        provincia,
        civil,
        estado,
        linkedin,
        nacionalidad,
        nacimiento,
        redes,
      },
      { id },
    ]);
    const [data] = await conect.query("SELECT * FROM perfiles WHERE ?", {
      id,
    });
    const newData = data[0];
    return newData;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return "registro existente";
    }
    console.error(error);
    throw error;
  } finally {
    conect.releaseConnection();
  }
}

const borrar = async (params)=>{
  const {id} = params
try {
  const [user]= await conect.query("DELETE FROM perfiles WHERE ?", {id})
  return user;
} catch (error) {
  throw error
}finally{
  conect.releaseConnection()
}
}

module.exports = {
  guardar,
  borrar,
  findOne,
  update,
};
