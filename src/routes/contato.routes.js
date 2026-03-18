const express = require("express");
const controller = require("../controller/contatoController");
const { authenticateToken } = require("../middlewares/authenticateToken");
const { authorizeRoles } = require("../middlewares/authorizeRoles");

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles(["user", "admin"]), controller.list);

router.get("/:id", authenticateToken, authorizeRoles(["user", "admin"]), controller.getById);

router.post("/", authenticateToken, authorizeRoles(["user", "admin"]), controller.create);

router.put("/:id", authenticateToken, authorizeRoles(["user", "admin"]), controller.update);

router.delete("/:id", authenticateToken, authorizeRoles(["admin"]), controller.remove);

module.exports = router;
