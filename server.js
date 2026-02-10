const http = require("http");

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      if (!data) return resolve(null);
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(new Error("JSON inválido"));
      }
    });
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function listUsers(res) {
  return sendJson(res, 200, users);
}

function listUserById(res, id) {
  if (!Number.isInteger(id)) {
    return sendJson(res, 400, { error: "ID inválido. Use um número inteiro." });
  }

  const user = users.find((u) => u.id === id);
  if (!user) {
    return sendJson(res, 404, { error: "Usuário não encontrado." });
  }

  return sendJson(res, 200, user);
}

let users = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Bruno" },
  { id: 3, name: "João" },
  { id: 4, name: "Maria" },
];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Endpoint 1: healthcheck
  if (method === "GET" && url === "/health") {
    return sendJson(res, 200, { status: "ok", timestamp: new Date().toISOString() });
  }

  // Endpoint 2: hello (REST “simples”)
  if (method === "GET" && url === "/api/v1/hello") {
    return sendJson(res, 200, { message: "Olá! Sua API está no ar" });
  }

  // Endpoint 3: echo (recebe JSON e devolve)
  if (method === "POST" && url === "/api/v1/echo") {
    try {
      const body = await readJsonBody(req);
      if (body === null) {
        return sendJson(res, 400, { error: "Body obrigatório (JSON)." });
      }
      return sendJson(res, 201, { received: body });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  
  // Endpoint 4: Listar todos os usuários
  if (method === "GET" && url === "/api/v1/users") {
    return sendJson(res, 200, users);
  }

  // Endpoint 5: Listar usuário por ID (ex.: /api/v1/users/2)
  if (method === "GET" && url.startsWith("/api/v1/users/")) {
    const parts = url.split("/");
    const id = Number(parts[parts.length - 1]);
    const user = users.find((u) => u.id === id);
    if (!user) {
      return sendJson(res, 404, { error: "Usuário não encontrado." });
    }

    return sendJson(res, 200, user);
  }

  // Endpoint 6: Criar novo usuário
  if(method === "POST" && url === "/api/v1/users"){
    try{
        const body = await readJsonBody(req);
        if (body === null) return badRequest(res, "Body obrigatório (JSON).");

      // validação didática mínima
      if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
        return badRequest(res, "Campo 'name' é obrigatório e deve ter pelo menos 2 caracteres.");
      }

      const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = { id: nextId, name: body.name.trim() };
      users.push(newUser);
        // 201 Created + objeto criado
      return sendJson(res, 201, newUser);
    } catch (err) {
      return badRequest(res, err.message);
    }
  }

  // 404 padrão
  return sendJson(res, 404, { error: "Rota não encontrada." });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
