const { validationResult } = require("express-validator");
const service = require("../service/userService.js");

const create = (req, res) => {
  res.render("users/create", { errors: [], layout: "layout/private" });
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
  const data = await service.guardar(req.body, req.file);
  res.render("users/sucess.ejs", { values: data });
};

const edit = (req, res) => {
  res.render("users/edit.ejs", {
    values: {},
    errors: [],
    layout: "layout/private",
  });
};

const sucess = (req, res) => {
  res.render("users/sucess.ejs", { layout: "layout/private" });
};

const perfil = async (req, res) => {
  const data = await service.findOne(req.params);
  res.render("users/perfil.ejs", {
    data,
  });
};

module.exports = {
  create,
  guardar,
  perfil,
  edit,
  sucess,
};
