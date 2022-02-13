const { Pool } = require("pg");

const connectionString = `postgres://${process.env.DB_PASSWORD}@kesavan.db.elephantsql.com/${process.env.DB_USER}`;
const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
  queryAll: (text, callback) => pool.query(text, callback),
  end: callback => pool.end(callback),
};
