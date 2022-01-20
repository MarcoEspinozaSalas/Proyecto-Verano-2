//Module que utiliza las variables creadas en el archivo .env
require('dotenv').config()
module.exports = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false
  }
};

