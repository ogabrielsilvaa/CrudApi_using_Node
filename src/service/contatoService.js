const repository = require("../repository/contatoRepository");

function list() {
  return repository.findAll();
}

function getById(id) {
  return repository.findById(id);
}

async function create(payload) {
  const contatoCriado = await repository.create(payload);
  return repository.findById(contatoCriado.id);
}

async function update(id, payload) {
  const affected = await repository.update(id, payload);
  if (!affected) return null;
  return repository.findById(id);
}

async function remove(id) {
  const affected = await repository.remove(id);
  return affected > 0;
}

module.exports = { list, getById, create, update, remove };
