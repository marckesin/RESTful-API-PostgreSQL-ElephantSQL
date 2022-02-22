const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send('<a href="/users">/users</a>');
});

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

router.all("*", (req, res) => {
  res.status(404).send("Endpoint not found.");
});

router.use("/users", (err, req, res, next) => {
  res.locals.message = err.message;
  res
    .status(err.status || 500)
    .json({ method: req.method, error: err.message });
  next();
});

module.exports = router;
