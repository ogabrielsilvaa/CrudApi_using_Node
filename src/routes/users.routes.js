// const express = require('express');
// repository = require("../database/users.memory");
// const { authenticateToken } = require("../middlewares/authenticateToken");
// const { authorizeRoles } = require("../middlewares/authorizeRoles");

// const router = express.Router();

// router.get("/", authenticateToken, authorizeRoles("user", "admin"), (req, res) => {
//   const page = Number(req.query.page || 1);
//   const limit = Number(req.query.limit || 10);
//   const all = repository.getAll();
//   const start = (page - 1) * limit;
//   const items = all.slice(start, start + limit);
//   res.status(200).json({ page, limit, total: all.length, items });
// });

// router.get("/getUserById/:id", authenticateToken, authorizeRoles("user", "admin"), (req, res) => {
//   const userId = Number(req.params.id);
//   const user = repository.getById(userId);
//   res.status(200).json({user});
// })

// router.post("/", authenticateToken, authorizeRoles("user", "admin"), (req, res) => {
//   const name = req.body.name;
//   const user = repository.create(name);
//   res.status(201).json({user});
// });

// router.put("/:id", authenticateToken, authorizeRoles("user", "admin"), (req, res) => {
//   const userId = Number(req.params.id);
//   const name = req.body.name;
//   const updatedUser = repository.updatedUser(userId, name);
//   if (updatedUser == null) {
//     res.status(404).json({});
//   }
//   res.status(200).json({updatedUser});
// });

// router.delete("/:id", authenticateToken, authorizeRoles("admin"), (req, res) => {
//   const userId = Number(req.params.id);
//   repository.deleteUser(userId);
//   res.status(200).json({});
// })

// module.exports = router;
