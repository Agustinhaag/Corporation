const { validationResult } = require("express-validator");
const service = require("../service/userService.js");

const create = (req, res) => {
  res.render("users/create", { values: {}, errors: [], layout: "layout/private" });
};

const guardar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.render("users/create", {
      values: req.body,
      errors: errors.array(),
    });
  }
  await service.guardar(req.body, req.file);
  res.redirect("/user");
};

const perfil = (req, res) => {
  res.render("users/perfil.ejs");
};

const edit = (req, res) => {
  res.render("users/edit.ejs",{values:{},errors:[],layout: "layout/private"});
};

const sucess = (req, res) => {
  res.render("users/sucess.ejs",{layout: "layout/private"});
};

module.exports = {
  create,
  guardar,
  edit,
  sucess,
  perfil,
};
