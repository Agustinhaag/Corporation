const modelo = require("../model/userModel");
const fs = require("fs"); 

const guardar = async (body, file) => {
  const result = await modelo.guardar(body, file);
  return result;
};
const findOne = async (params) => {
  const result = await modelo.findOne(params);
  return result;
};
const borrar = async (params) => {
    const row = await modelo.findOne(body);
    if (file && row.cv) {
      if (fs.existsSync(`public/Uploads/cv/${row.cv}`)) {
        fs.unlinkSync(`public/Uploads/cv/${row.cv}`);
      }
    }
    if (file && row.image) {
        if (fs.existsSync(`public/Uploads/img/${row.image}`)) {
          fs.unlinkSync(`public/Uploads/img/${row.image}`);
        }
      }
  const user = await modelo.borrar(params);
  return user;
};
const update = async (body, file) => {
  const row = await modelo.findOne(body);
  if (file && row.cv) {
    if (fs.existsSync(`public/Uploads/cv/${row.cv}`)) {
      fs.unlinkSync(`public/Uploads/cv/${row.cv}`);
    }
  }
  body.cv = row.cv;
  if (file) {
    body.cv = file.filename;
  }
  const result = await modelo.update(body, file);
  return result;
};
module.exports = {
  guardar,
  update,
  borrar,
  findOne,
};
