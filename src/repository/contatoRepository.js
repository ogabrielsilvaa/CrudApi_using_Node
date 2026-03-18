const { Contato, Usuario } = require("../database/models");

function findAll() {
  return Contato.findAll({
    include: [
      { 
        model: Usuario, 
        as: "usuario",
        attributes: { exclude: ["senha"] } // Traz os dados do dono do contato, protegendo a senha
      }
    ]
  });
}

function findById(id) {
  return Contato.findByPk(id, {
    include: [
      { 
        model: Usuario, 
        as: "usuario",
        attributes: { exclude: ["senha"] }
      }
    ]
  });
}

function create(data) {
  return Contato.create(data);
}

async function update(id, data) {
  const [affected] = await Contato.update(data, { where: { id } });
  return affected;
}

function remove(id) {
  return Contato.destroy({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };
