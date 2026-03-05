const express = require("express");
const controller = require("../controller/userController");
const { authenticateToken } = require("../middlewares/authenticateToken");
const { authorizeRoles } = require("../middlewares/authorizeRoles");

const router = express.Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", authenticateToken, authorizeRoles(["user", "admin"]), controller.create);
router.put("/:id", authenticateToken, authorizeRoles(["user", "admin"]), controller.update);
router.delete("/:id", authenticateToken, authorizeRoles(["admin"]), controller.remove);

module.exports = router;
