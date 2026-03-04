const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if(!authHeader)
    return res.status(401).json({ message: "Token ausente." });
  
  const [type, token] = authHeader.split(" ");
  if(type !== "Bearer" || !token)
    return res.status(401).json({ message: "Formato inválido. Use: Authorization Bearer <token>" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}

module.exports = { authenticateToken };
