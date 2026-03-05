const service = require("../service/userService");

async function list(req, res, next) {
  try {
    const data = await service.list();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const data = await service.getById(id);
    if (!data) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const created = await service.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await service.update(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const ok = await service.remove(id);
    if (!ok) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { list, getById, create, update, remove };
