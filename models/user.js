require('dotenv').config();

// Database connection
const connection = require('../database/connection');

// Create User
async function createUser(user) {
    const { user_name, first_name, last_name, email, password, is_writer } = user;

    const rows = await connection.execute(
        `INSERT INTO Users (user_name, first_name, last_name, email, password, is_writer)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_name, first_name, last_name, email, password, is_writer]
    );
    return rows;
}

// Get User by ID
async function getUserById(id) {
    const [response] = await connection.execute(
        `SELECT * FROM Users WHERE id = ?`,
        [id]
    );
    // console.log(response);
    return response;
}

// Get User by Email
async function getUserByEmail(email) {
    const rows = await connection.execute(
        `SELECT * FROM Users WHERE email = ?`,
        [email]
    );
    return rows;
}

// Update User
async function updateUser(id, user) {
    const { user_name, first_name, last_name, email, password, is_writer } = user;
    const rows = await connection.execute(
        `UPDATE Users SET user_name = ?, first_name = ?, last_name = ?, email = ?, password = ?, is_writer = ?
         WHERE id = ?`,
        [user_name, first_name, last_name, email, password, is_writer, id]
    );
    return rows;
}

// Delete User
async function deleteUser(id) {
    const rows = await connection.execute(
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
