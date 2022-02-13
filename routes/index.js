const users = require("./users");
const status = require("./status");

module.exports = app => {
  app.use(users);
  app.use(status);
};
