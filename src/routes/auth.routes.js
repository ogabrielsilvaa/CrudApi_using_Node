const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findByUserName } = require("../database/login.memory");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Informe username e password." });

  const user = findByUserName(username);
  if (!user)
    return res.status(401).json({ message: "Credenciais inválidas." });

  const validPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!validPassword)
    return res.status(401).json({ message: "Credenciais inválidas." });

  const payload = {
    sub: String(user.id),
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

  return res.json({
    tokenType: "Bearer",
    accessToken: token,
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
});

module.exports = router;
