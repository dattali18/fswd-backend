const mysql = require('mysql2/promise');

require('dotenv').config();

// Database connection
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Create User
async function createUser(user) {
    const { user_name, first_name, last_name, email, password, is_writer } = user;
    const [rows] = await connection.execute(
        `INSERT INTO Users (user_name, first_name, last_name, email, password, is_writer)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_name, first_name, last_name, email, password, is_writer]
    );
    return rows;
}

// Get User by ID
async function getUserById(id) {
    const [rows] = await connection.execute(
        `SELECT * FROM Users WHERE id = ?`,
        [id]
    );
    return rows[0];
}

// Get User by Email
async function getUserByEmail(email) {
    const [rows] = await connection.execute(
        `SELECT * FROM Users WHERE email = ?`,
        [email]
    );
    return rows[0];
}

// Update User
async function updateUser(id, user) {
    const { user_name, first_name, last_name, email, password, is_writer } = user;
    const [rows] = await connection.execute(
        `UPDATE Users SET user_name = ?, first_name = ?, last_name = ?, email = ?, password = ?, is_writer = ?
         WHERE id = ?`,
        [user_name, first_name, last_name, email, password, is_writer, id]
    );
    return rows;
}

// Delete User
async function deleteUser(id) {
    const [rows] = await connection.execute(
        `DELETE FROM Users WHERE id = ?`,
        [id]
    );
    return rows;
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};
