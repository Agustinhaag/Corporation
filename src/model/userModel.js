const { conect } = require("../conect/conect");
const moment = require("moment");

const guardar = async (body, file) => {
  let edad = parseInt(body.edad);
  let telefono = parseInt(body.telefono);
  let cv = file.cv ? file.cv[0].filename : null;
  let image = file.image ? file.image[0].filename : null;
  let descripcion = body.descripcion ? body.descripcion : null;
  let habilidades = body.habilidades ? body.habilidades : null;
  let redes = body.redes ? body.redes : null;
  let secundario = body.secundario ? body.secundario : null;
  let cursos = body.cursos ? body.cursos : null;
  let posicion = body.posicion ? body.posicion : null;
  let empleador = body.empleador ? body.empleador : null;
  let descripcionLaboral = body.descripcionLaboral
    ? body.descripcionLaboral
    : null;
  let posicion2 = body.posicion2 ? body.posicion2 : null;
  let empleador2 = body.empleador2 ? body.empleador2 : null;
  let descripcionLaboral2 = body.descripcionLaboral2
    ? body.descripcionLaboral2
    : null;
  let titulo2 = body.titulo2 ? body.titulo2 : null;
  let estado2 = body.estado2 ? body.estado2 : null;
  let puesto2 = body.puesto2 ? body.puesto2 : null;
  let estudios2 = body.estudios2 ? body.estudios2 : null;
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
        image,
        nacionalidad,
        nacimiento,
        redes,
        secundario,
        cursos,
        posicion,
        posicion2,
        puesto2,
        descripcionLaboral,
        descripcionLaboral2,
        empleador,
        empleador2,
        estudios2,
        titulo2,
        estado2,
      },
      { email },
    ]);
    const [data] = await conect.query("SELECT * FROM perfiles WHERE ?", {
      email,
    });
    const newData = data[0];
    console.log(newData);
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

const findOne = async (body) => {
  const { id } = body;
  parseInt(id);
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

const update = async (body, file) => {
  let edad = parseInt(body.edad);
  let telefono = parseInt(body.telefono);
  let cv = file.cv ? file.cv[0].filename : null;
  let image = file.image ? file.image[0].filename : null;  
  let descripcion = body.descripcion ? body.descripcion : null;
  let habilidades = body.habilidades ? body.habilidades : null;
  let redes = body.redes ? body.redes : null;
  let secundario = body.secundario ? body.secundario : null;
  let cursos = body.cursos ? body.cursos : null;
  let posicion = body.posicion ? body.posicion : null;
  let empleador = body.empleador ? body.empleador : null;
  let descripcionLaboral = body.descripcionLaboral
    ? body.descripcionLaboral
    : null;
  let posicion2 = body.posicion2 ? body.posicion2 : null;
  let empleador2 = body.empleador2 ? body.empleador2 : null;
  let descripcionLaboral2 = body.descripcionLaboral2
    ? body.descripcionLaboral2
    : null;
  let titulo2 = body.titulo2 ? body.titulo2 : null;
  let estado2 = body.estado2 ? body.estado2 : null;
  let puesto2 = body.puesto2 ? body.puesto2 : null;
  let estudios2 = body.estudios2 ? body.estudios2 : null;
  const {
    name,
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
        image,
        estado,
        linkedin,
        nacionalidad,
        nacimiento,
        redes,
        secundario,
        cursos,
        posicion,
        posicion2,
        puesto2,
        descripcionLaboral,
        descripcionLaboral2,
        empleador,
        empleador2,
        estudios2,
        titulo2,
        estado2,
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
};

const borrar = async (params) => {
  const { id } = params;
  try {
    const [user] = await conect.query("DELETE FROM perfiles WHERE ?", { id });
    return user;
  } catch (error) {
    throw error;
  } finally {
    conect.releaseConnection();
  }
};

const findAll = async () => {
  try {
    const [rows] = await conect.query("SELECT * FROM perfiles");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    conect.releaseConnection();
  }
};

module.exports = {
  guardar,
  findAll,
  borrar,
  findOne,
  update,
};
