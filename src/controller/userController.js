const { validationResult } = require("express-validator");
const service = require("../service/userService.js");
const moment = require("moment");

const create = (req, res) => {
  res.render("users/create", { errors: [], layout: "layout/private" });
};

const guardar = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.render("users/create", {
      values: req.body,
      errors: errors.array(),
    });
  }
  const data = await service.guardar(req.body, req.files);
  res.render("users/sucess.ejs", { values: data });
};

const edit = async (req, res) => {
  const user = await service.findOne(req.params);
  const userId = req.params.id; // Obtén el identificador del usuario cuyo perfil se quiere editar
  const authenticatedUserId = req.session.user_id;
  if (userId != authenticatedUserId) {
    res
      .status(403)
      .render("users/error.ejs");
    return;
  }
  res.render("users/edit.ejs", {
    values: user,
    errors: [],
    layout: "layout/private",
  });
};

const borradoExitoso = (req, res) => {
  res.render("users/borradoExitoso.ejs", { layout: "layout/private" });
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("users/edit.ejs", {
      values: req.body,
      errors: errors.array(),
    });
  }
  const result = await service.findOne(req.body);
  const fechaFormateada = moment(result.nacimiento).format("YYYY/MM/DD");
  const data = await service.update(req.body, req.files);

  res.render("users/perfil.ejs", { data, fechaFormateada });
};

const borrar = async (req, res) => {
  const userId = req.body.Id; 
  const authenticatedUserId = req.session.user_id;
  if (userId != authenticatedUserId) {
    res
      .status(403)
      .render("users/error.ejs");
    return;
  }
  const user = await service.borrar(req.body, req.file);
  req.session.user_id = null;
  return res.redirect("/user/borradoExitoso");
};

const sucess = (req, res) => {
  res.render("users/sucess.ejs", { layout: "layout/private" });
};

const perfil = async (req, res) => {
 
  const data = await service.findOne(req.params);
  const fechaFormateada = moment(data.nacimiento).format("YYYY/MM/DD");
  res.render("users/perfil.ejs", {
    data,
    layout: "layout/private",
    fechaFormateada,
  });
};

module.exports = {
  create,
  guardar,
  perfil,
  edit,
  borrar,
  borradoExitoso,
  update,
  sucess,
};
