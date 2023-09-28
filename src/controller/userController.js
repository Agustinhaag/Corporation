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

const edit = async (req, res) => {
  const user = await service.findOne(req.params);
  res.render("users/edit.ejs", {
    values: user,
    errors: [],
    layout: "layout/private",
  });
};

const borradoExitoso = (req,res)=>{
res.render("users/borradoExitoso.ejs",{layout: "layout/private"})
}

const update = () => {};

const borrar = async (req, res) => {
  const user = await service.borrar(req.params);
  req.session.user_id = null;
 return res.redirect("/user/borradoExitoso");
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
  borrar,
  borradoExitoso,
  update,
  sucess,
};
