const Pool = require("pg").Pool;

const pool = new Pool({
  user: "thakshaka",
  password: "thakshaka",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});

module.exports = pool;
