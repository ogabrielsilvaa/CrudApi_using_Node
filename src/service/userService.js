const bcrypt = require("bcryptjs");
const repository = require("../repository/userRepository");

function list() {
  return repository.findAll();
}

function getById(id) {
  return repository.findById(id);
}

async function create(payload) {
  const senha = await bcrypt.hash(payload.senha, 10);
  const usuarioCriado = await repository.create({ ...payload, senha });
  return repository.findById(usuarioCriado.id);
}

async function update(id, payload) {
  const data = { ...payload };
  if (data.senha) {
    data.senha = await bcrypt.hash(data.senha, 10);
  }
  const affected = await repository.update(id, data);
  if (!affected) return null;
  return repository.findById(id);
}

async function remove(id) {
  const affected = await repository.remove(id);
  return affected > 0;
}

module.exports = { list, getById, create, update, remove };
