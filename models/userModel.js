// require("dotenv").config();

// Database connection
const connection = require("../database/connection");

async function allUsers() {
  const [rows] = await connection.execute(`SELECT * FROM Users`);
  return rows;
}

// Get user by id
async function getUserById(id) {
  const [rows] = await connection.execute(
    `SELECT * FROM Users WHERE id = ?`,
    [id]
  );
  return rows;
}

// Create User
async function createUser(user) {
  const { user_name, first_name, last_name, email, password } = user;

  const rows = await connection.execute(
    `INSERT INTO Users (user_name, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)`,
    [user_name, first_name, last_name, email, password]
  );
  return rows;
}

// Get User by Email
async function getUserByEmail(email) {
  const [rows] = await connection.execute(
    `SELECT * FROM Users WHERE email = ?`,
    [email]
  );
  return rows;
}

// Update User
async function updateUser(id, user) {
  const { user_name, first_name, last_name } = user;
  const rows = await connection.execute(
    `UPDATE Users SET user_name = ?, first_name = ?, last_name = ?
      WHERE id = ?`,
    [user_name, first_name, last_name, id]
  );
  return rows;
}

// Delete User
async function deleteUser(id) {
  const rows = await connection.execute(`DELETE FROM Users WHERE id = ?`, [id]);
  return rows;
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  allUsers,
};
