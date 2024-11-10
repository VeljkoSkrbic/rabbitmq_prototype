// config.js
module.exports = {
  "development": {
    "username": "root",
    "password": process.env.MYSQL_ROOT_PASSWORD, // Now you can use environment variables
    "database": "a",                             // Replace with your actual database name
    "host": process.env.DB_URL,                  // Reads from environment variable
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.MYSQL_ROOT_PASSWORD,
    "database": "a",
    "host": process.env.DB_URL,
    "dialect": "mysql"
  }
}
