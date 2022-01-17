require('dotenv').config();
import mssql from 'mssql'

let connection = mssql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const dbSettings = {
    user:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME
}
connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

async function getConnection() {
    const pool = await mssql.connect(dbSettings);
    const result = await pool.request().query("SELECT 1");
    console.log(result);
}

module.exports = connection;
