const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require('../database/models');

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Informe username e password." });

  try {
    const user = await db.Usuario.findOne({ where: { email: email } });
    if (!user)
      return res.status(401).json({ message: "Credenciais inválidas." });

    const validPassword = bcrypt.compareSync(password, user.senha);
    if (!validPassword)
      return res.status(401).json({ message: "Credenciais inválidas." });

    const payload = {
      sub: String(user.id),
      username: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return res.json({
      tokenType: "Bearer",
      accessToken: token,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.error("Erro interno no login: ", error);
    return res.status(500).json({ message: "Erro ao processar o login." });
  }

});

module.exports = router;
