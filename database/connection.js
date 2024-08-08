// require("dotenv").config();

import dotenv from "dotenv";
dotenv.config();

import { createPool } from "mysql2/promise";

const connection = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

// connection.connect(
//     (err) => {
//         if (err) throw err;
//         // console.log("Connected to the database");
//     }
// )

export default connection;