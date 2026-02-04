const { resolve } = require("path");
const http = require("http");
const { timeStamp } = require("console");

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk)) //chunk = tipo de arquivo vindo da req
    req.on("end", () => {
      if (!data) return resolve(null);
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(new Error("JSON inválido."));
      }
    });
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

let users = [
  {id: 1, name: "Ana"},
  {id: 2, name: "Gab"},
  {id: 3, name: "João"},
  {id: 4, name: "Leo"},
]

const server = http.createServer(async (req, res) => {
  const {method, url} = req; //method = tipo de requisiçao | url = endereço

  //endpoint 1: healthcheck - saber se a conexao esta ok
  if (method === "GET" && url === "/health") {
    return sendJson(res, 200, { status: "ok", timeStamp: new Date().toISOString()});
  }

  //endpoint 2: listar usuarios
  if (method === "GET" && url === "/api/v1/users") {
    return sendJson(res, 200, users);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
