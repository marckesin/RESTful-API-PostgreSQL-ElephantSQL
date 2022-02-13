const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../db/database.config");

const saltRounds = 10;

exports.usersGetAll = async (req, res) => {
  await db.queryAll(
    "SELECT username, uuid FROM application_user",
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      res.status(200).send(result.rows);
    },
  );
};

exports.usersGetById = async (req, res) => {
  const uuid = req.params.uuid;

  await db.query(
    "SELECT username, uuid FROM application_user WHERE uuid = $1",
    [uuid],
    (err, result) => {
      if (err) {
        return res.send(err);
      } else if (!result.rowCount) {
        return res.status(404).send("User not found.");
      }
      res.status(200).send(result.rows[0]);
    },
  );
};

exports.usersCreate = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    await db.query(
      "INSERT INTO application_user VALUES ($1, $2, $3)",
      [uuidv4(), username, hash],
      (err, result) => {
        if (err) {
          return res.send(err);
        }
        res.status(201).send("User created.");
      },
    );
  });
};

exports.usersUpdate = async (req, res) => {
  const uuid = req.params.uuid;
  const { username, password } = req.body;

  await db.query(
    "UPDATE application_user SET username = $1, password = $2 WHERE uuid = $3 ",
    [username, password, uuid],
    (err, result) => {
      if (err) {
        return res.send(err);
      } else if (!result.rowCount) {
        return res.status(404).send("User not found.");
      }
      res.status(200).json({ username: username, password: password });
    },
  );
};

exports.usersDelete = async (req, res) => {
  const uuid = req.params.uuid;

  await db.query(
    "DELETE FROM application_user WHERE uuid = $1;",
    [uuid],
    (err, result) => {
      if (err) {
        return res.send(err);
      } else if (!result.rowCount) {
        return res.status(404).send("UserId not found.");
      }
      res.status(200).send("User deleted.");
    },
  );
};
