// this file will be used to create the database and the tables

// importing connection from connection.js
// require("dotenv").config();

import dotenv from "dotenv";
dotenv.config();

import connection from "../connection.js";

const createDatabaseAndTables = async () => {
    try {
        // creating the database if not exists
        const dbName = process.env.DB_DATABASE;
        
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        console.log("Database created");

        await connection.query(`USE ${dbName}`);

        // SQL commands to create tables
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(255) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_writer BOOLEAN NOT NULL DEFAULT FALSE,
                joined_date DATETIME NOT NULL DEFAULT NOW()
            )
        `;

        const createArticlesTable = `
            CREATE TABLE IF NOT EXISTS Articles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                writer_id INT,
                title VARCHAR(255) NOT NULL,
                FOREIGN KEY (writer_id) REFERENCES Users(id)
            )
        `;

        const createCommentsTable = `
            CREATE TABLE IF NOT EXISTS Comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                article_id INT,
                text TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (article_id) REFERENCES Articles(id)
            )
        `;

        const createLikesTable = `
            CREATE TABLE IF NOT EXISTS Likes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                article_id INT,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (article_id) REFERENCES Articles(id)
            )
        `;

        // Execute the queries
        await connection.query(createUsersTable);
        console.log("Users table created");

        await connection.query(createArticlesTable);
        console.log("Articles table created");

        await connection.query(createCommentsTable);
        console.log("Comments table created");

        await connection.query(createLikesTable);
        console.log("Likes table created");

    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection
        await connection.end();
    }
};

createDatabaseAndTables();
