const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const controller = require("../controller/userController.js");

route.get("/", controller.perfil);

const validar = [
  body("name").notEmpty().withMessage("El campo nombre no puede estar vacio"),
  body("edad").notEmpty().withMessage("El campo edad no puede estar vacio"),
  body("email").notEmpty().withMessage("El campo email no puede estar vacio"),
  body("genero").notEmpty().withMessage("Debe elegir una opción"),
  body("nacimiento")
    .notEmpty()
    .withMessage("El campo Fecha de nacimiento no puede estar vacio"),
  body("caracteristica")
    .notEmpty()
    .withMessage("El campo Característica no puede estar vacio"),
  body("telefono")
    .notEmpty()
    .withMessage("El campo Teléfono no puede estar vacio"),
  body("pais").notEmpty().withMessage("El campo país no puede estar vacio"),
  body("provincia")
    .notEmpty()
    .withMessage("El campo provincia no puede estar vacio"),
  body("domicilio")
    .notEmpty()
    .withMessage("El campo domicilio no puede estar vacio"),
  body("estudios")
    .notEmpty()
    .withMessage("El campo estudios no puede estar vacio"),
  body("titulo").notEmpty().withMessage("El campo titulo no puede estar vacio"),
  body("trabajo")
    .notEmpty()
    .withMessage("El campo trabajo no puede estar vacio"),
  body("cv")
    .custom((value, { req }) => {
      if (req.file.mimetype === "application/pdf") {
        return ".pdf";
      } else {
        return false;
      }
    })
    .withMessage("Por favor envie un archivo .PDF"),
];

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/Uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const cargar = multer({ storage });

route.get("/create", controller.create);
route.post("/", cargar.single("cv"), validar, controller.guardar);
route.get("/sucess", controller.sucess)

route.get("/edit", controller.edit);

module.exports = route;
