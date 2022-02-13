const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../db/database.config");

const router = express.Router();

// [GET] all entries
router.get("/users", async (req, res, next) => {
  await db.queryAll(
    "SELECT username, uuid FROM application_user",
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      res.status(200).send(result.rows);
    },
  );
});

// [GET] by id
router.get("/users/:uuid", async (req, res, next) => {
  const uuid = req.params.uuid;

  await db.query(
    "SELECT username, uuid FROM application_user WHERE uuid = $1",
    [uuid],
    (err, result) => {
      if (err) {
        return res.send(err);
      } else if (!result.rowCount) {
        return res.send("User not found.");
      }
      res.status(200).send(result.rows[0]);
    },
  );
});

// [POST]
router.post("/users", async (req, res) => {
  const { username, password } = req.body;

  await db.query(
    "INSERT INTO application_user VALUES ($1, $2, $3)",
    [uuidv4(), username, password],
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      res.status(201).send(result);
    },
  );
});

router.put("/users/:uuid", (req, res) => {
  console.log(req.params.uuid);
});

router.delete("/users/:uuid", (req, res) => {
  console.log(req.params.uuid);
});

module.exports = router;
