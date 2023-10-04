const modelo = require("../model/userModel");

const findAll = async (req, res) => {
  const rows = await modelo.findAll();
  res.render("talents/users", { rows });
};

module.exports = {
  findAll,
};
