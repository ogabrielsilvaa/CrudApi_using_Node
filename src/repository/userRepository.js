const { Usuario, Endereco, Contato } = require("../database/models");

function findAll() {
  return Usuario.findAll({
    attributes: { exclude: ["senha"] },
    include: [
      { model: Endereco, as: "enderecos" },
      { model: Contato, as: "contatos" },
    ]
  });
}

function findById(id) {
  return Usuario.findByPk(id, {
    attributes: { exclude: ["senha"] },
    include: [
      { model: Endereco, as: "enderecos" },
      { model: Contato, as: "contatos" },
    ]
  });
}

function create(data) {
  return Usuario.create(data);
}

async function update(id, data) {
  const [affected] = await Usuario.update(data, { where: { id } });
  return affected;
}

function remove(id) {
  return Usuario.destroy({ whrere: { id } });
}

module.exports = { findAll, findById, create, update, remove };
