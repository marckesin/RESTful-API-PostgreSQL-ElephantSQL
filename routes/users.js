require("dotenv").config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const db = require("../db/configuration-database");

router.get("/users/:uuid", (req, res) => {
  const uuid = req.params.uuid;
  res.status(200).send({ uuid: uuid });
});

router.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const { rows } = await db.query(
    "INSERT INTO application_user VALUES ($1, $2, $3)",
    [uuidv4(), username, password],
  );
  res.status(201).send(rows[0]);
});

router.put("/users/:uuid", (req, res) => {
  console.log(req.params.uuid);
});

router.delete("/users/:uuid", (req, res) => {
  console.log(req.params.uuid);
});

module.exports = router;
