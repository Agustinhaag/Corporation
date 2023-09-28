const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const { conect } = require("../conect/conect");
const controller = require("../controller/loginController");

const validacion = [
  body("name").notEmpty().withMessage("El campo nombre no puede estar vacio"),
  body("image")
    .custom((value, { req }) => {
      if (req.file) {
        return "exito";
      } else {
        return false;
      }
    })
    .withMessage("Ingrese una foto de perfil"),
  body("surname")
    .notEmpty()
    .withMessage("El campo apellido no puede estar vacio"),
  body("email")
    .isEmail()
    .withMessage("El campo email no puede estar vacio")
    .bail()
    .custom((value) => {
      return new Promise((resolve, reject) => {
        sql = "SELECT * FROM perfiles WHERE email = ?";
        where = [value];
        conect.query(sql, where).then((row) => {
          if (row[0].length != 0) {
            return reject();
          }
          return resolve();
        });
      });
    })
    .withMessage("Email duplicado"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
      minLowercase: 1,
    })
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres: una minúscula, una mayúscula, un número y un carácter especial"
    )
    .bail()
    .custom((value, { req }) => value == req.body.password2)
    .withMessage("Las contraseñas no coinciden"),
  body("check")
    .notEmpty()
    .withMessage("Debe aceptar los términos y condiciones"),
];

const multer = require("multer");
const storageImg = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/Uploads/img"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const cargar = multer({ storage: storageImg });

route.get("/register", controller.register);
route.post(
  "/register",
  cargar.single("image"),
  validacion,
  controller.createRegister
);

route.get("/login", controller.login);
route.post("/login", controller.postLogin);

route.get("/logout", controller.logout);

module.exports = route;
