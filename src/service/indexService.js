const nodemailer = require("nodemailer");
const modelo = require("../model/indexModel")

const postEmail = async (body) => {
  const { name, email, telefono, date, mensaje } = body;
  let content = `
  <h2>Información del usuario</h2>
   <ul>
      <li>Nombre completo: ${name}</li>
      <li>Fecha de nacimiento: ${date}</li>
      <li>Email: ${email}</li>
      <li>Teléfono: ${telefono} </li>
   </ul> 
   <p>Consulta: ${mensaje}</p> 
   `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:  process.env.portEmail,
    secure: false,
    auth: {
      user: process.env.userEmail,
      pass: process.env.passEmail,
    },
  });

  const info = await transporter.sendMail({
    from: "'AH-TECH' agushaag30@gmail.com",
    to: process.env.userEmail,
    subject: "Formulario de contacto de AH-TECH",
    html: content,
  });

};

const findAll = async ()=>{
  const rows = await modelo.findAll()
  return rows
}

module.exports = {
  postEmail,
  findAll,
};