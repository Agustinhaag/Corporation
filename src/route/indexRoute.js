const express = require("express");
const route = express.Router();
const controller = require("../controller/indexController");
const { body } = require("express-validator");

const validacion = [
  body("name").notEmpty().withMessage("El campo nombre no puede estar vacio"),
  body("email").notEmpty().withMessage("El campo email no puede estar vacio"),
  body("telefono").notEmpty().withMessage("El campo telefono no puede estar vacio"),
  body("date").notEmpty().withMessage("Debe ingresar su fecha de nacimiento"),
  body("mensaje")
    .notEmpty()
    .withMessage("El campo mensaje no puede estar vacio")
    .bail()
    .custom(value => {
      if (value.trim() === '') {
        throw new Error('El campo mensaje no puede contener solo espacios en blanco');
      }
      return true
    }),
];

route.get("/sucess", controller.sucess)
route.get("/", controller.index);
route.post("/", validacion, controller.enviar);

module.exports = route;
