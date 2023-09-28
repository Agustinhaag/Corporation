const bcryptjs = require("bcryptjs");
const modelo = require("../model/loginModel");

const createRegister = async (body, file) => {
  body.password = await bcryptjs.hash(body.password, 8);
  const rows = await modelo.createRegister(body, file);
  return rows;
};

const postLogin = async (body) => {
  const row = await modelo.postLogin(body);
  return row;
};

const mostrar = async (body) => {
  const row = await modelo.mostrar(body);
  return row;
};
module.exports = {
  createRegister,
  postLogin,
  mostrar,
};
