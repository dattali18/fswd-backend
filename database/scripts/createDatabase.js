// this file will be used to create the database and the tables

// importing connection from connection.js
require("dotenv").config();

const connection = require("../connection");

// creating the database if not exists
const dbName = process.env.DB_DATABASE;

connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
    if (err) throw err;
    console.log("Database created");
});

connection.query(`USE ${dbName}`);

// creating the table if not exists


// SQL commands to create tables
const createUsersTable = `
    CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_writer BOOLEAN NOT NULL
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
connection.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log("Users table created");
});

connection.query(createArticlesTable, (err) => {
    if (err) throw err;
    console.log("Articles table created");
});

connection.query(createCommentsTable, (err) => {
    if (err) throw err;
    console.log("Comments table created");
});

connection.query(createLikesTable, (err) => {
    if (err) throw err;
    console.log("Likes table created");
});

// Close the connection
connection.end();
