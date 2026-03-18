const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require('../database/models');

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Autentica um usuário e retorna um token JWT
 *    tags: [Autenticação]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                example: arrascaeta@flamengo.com
 *              password:
 *                type: string
 *                example: 123
 *    responses:
 *      200:
 *        description: Login realizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                tokenType:
 *                  type: string
 *                  example: Bearer
 *                accessToken:
 *                  type: string
 *                  description: Token JWT gerado
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI...
 *                expiresIn:
 *                  type: string
 *                  description: Tempo de expiração do token
 *                  example: 1d
 *      400:
 *        description: Dados incompletos (E-mail ou senha ausentes)
 *      401:
 *        description: Credenciais inválidas (Usuário não encontrado ou senha incorreta)
 *      500:
 *        description: Erro interno no servidor
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Informe email e password." });

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
