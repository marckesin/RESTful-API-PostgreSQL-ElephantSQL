const { Pool } = require("pg");

const connectionString = `postgres://${process.env.DB_PASSWORD}@kesavan.db.elephantsql.com/${process.env.DB_USER}`;
const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
