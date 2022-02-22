const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../db/database.config");

const saltRounds = 10;

exports.usersGetAll = async (req, res, next) => {
  try {
    const result = await db.queryAll(
      "SELECT username, uuid, password FROM application_user",
    );
    return res.status(200).send(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.usersGetById = async (req, res, next) => {
  const { uuid } = req.params;

  try {
    const result = await db.query(
      "SELECT username, uuid, password FROM application_user WHERE uuid = $1",
      [uuid],
    );

    if (result.rowCount) {
      return res.status(200).send(result.rows[0]);
    }
    return res.status(404).send("User not found.");
  } catch (error) {
    next(error);
  }
};

exports.usersCreate = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO application_user VALUES ($1, $2, $3)",
      [uuidv4(), username, await bcrypt.hash(password, saltRounds)],
    );

    if (result.rowCount) {
      return res.status(201).send("User created.");
    }
  } catch (error) {
    next(error);
  }
};

exports.usersUpdate = async (req, res) => {
  const { uuid } = req.params;
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
  const { uuid } = req.params;

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
