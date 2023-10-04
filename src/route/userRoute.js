const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const path = require("path");
const { conect } = require("../conect/conect");
const controller = require("../controller/userController.js");

const validar = [
  body("name").notEmpty().withMessage("El campo nombre no puede estar vacio"),
  body("edad").notEmpty().withMessage("El campo edad no puede estar vacio"),
  body("email")
    .notEmpty()
    .withMessage("El campo email no puede estar vacio"),
  body("genero").notEmpty().withMessage("Debe elegir una opción"),
  body("linkedin").notEmpty().withMessage("Indique su perfil de Linkedin"),
  body("estado").notEmpty().withMessage("El campo no puede estar vacio"),
  body("nacionalidad").notEmpty().withMessage("Debe indicar su nacionalidad"),
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
  body("civil")
    .notEmpty()
    .withMessage("El campo estado civil no puede estar vacio"),
  body("estudios")
    .notEmpty()
    .withMessage("El campo estudios no puede estar vacio"),
  body("titulo").notEmpty().withMessage("El campo titulo no puede estar vacio"),
  body("trabajo")
    .notEmpty()
    .withMessage("El campo trabajo no puede estar vacio"),
  body("descripcionLaboral")
    .notEmpty()
    .withMessage("Ingrese un detalle de su puesto laboral"),
  body("empleador")
    .notEmpty()
    .withMessage("Ingrese el nombre de su empleador o indique su situación"),
  body("posicion").notEmpty().withMessage("Ingrese la posicion en el puesto"),
  body("secundario").notEmpty().withMessage("Indique el titulo secundario"),
  body("cursos").notEmpty().withMessage("Ingrese los cursos y capacitaciones"),
  body("cv")
    .custom((value, { req }) => {
      if (
        req.files &&
        req.files.cv &&
        req.files.cv[0].mimetype === "application/pdf"
      ) {
        return ".pdf";
      } else {
        return false;
      }
    })
    .withMessage("Por favor envíe un archivo .PDF"),
  body("image")
    .custom((value, { req }) => {
      if (req.files && req.files.image) {
        const validImageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
        if (validImageMimeTypes.includes(req.files.image[0].mimetype)) {
          return true;
        }
      }
      return false;
    })
    .withMessage("Ingrese una imagen válida (jpg, jpeg, png, gif)."),
];

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationDir = "";
    if (file.fieldname === "image") {
      destinationDir = "public/Uploads/img";
    } else if (file.fieldname === "cv") {
      destinationDir = "public/Uploads/cv";
    }
    cb(null, destinationDir);
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.originalname}-${Date.now()}${extname}`);
  },
});

const upload = multer({ storage });

route.get("/create", controller.create);
route.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  validar,
  controller.guardar
);

route.get("/perfil/:id", controller.perfil);

route.get("/edit/:id", controller.edit);
route.put(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  validar,
  controller.update
);

route.delete("/:id", controller.borrar);

route.get("/sucess", controller.sucess);
route.get("/borradoExitoso", controller.borradoExitoso);

route.get("/edit", controller.edit);

module.exports = route;
