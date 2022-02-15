const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

// [GET] all entries
router.get("/users", usersController.usersGetAll);

// [GET] by id
router.get("/users/:uuid", usersController.usersGetById);

// [POST]
router.post("/users", usersController.usersCreate);

// [PUT]
router.put("/users/:uuid", usersController.usersUpdate);

// [DELETE]
router.delete("/users/:uuid", usersController.usersDelete);

module.exports = router;
