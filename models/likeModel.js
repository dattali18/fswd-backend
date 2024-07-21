const connection = require('../config/connection');

// Get all likes
async function allLikes(articleId) {
  const [rows] = await connection.execute(`SELECT * FROM Likes
    WHERE article_id = ?`, [articleId]);
  return rows;
}

// Create Like
async function createLike(like) {
  const { user_id, article_id } = like;

  const rows = await connection.execute(
    `INSERT INTO Likes (user_id, article_id) VALUES (?, ?)`,
    [user_id, article_id]
  );
  return rows;
}

// Delete Like
async function deleteLike(like) {
  const { user_id, article_id } = like;

  const rows = await connection.execute(
    `DELETE FROM Likes WHERE user_id = ? AND article_id = ?`,
    [user_id, article_id]
  );
  return rows;
}

// Get Like by ID
async function getLikeById(id) {
  const [response] = await connection.execute(
    `SELECT * FROM Likes WHERE id = ?`,
    [id]
  );
  return response;
}

// Get Like by User ID
async function getLikeByUserId(userId) {
  const [rows] = await connection.execute(
    `SELECT * FROM Likes WHERE user_id = ?`,
    [userId]
  );
  return rows;
}

// Get Like by Article ID
async function getLikeByArticleId(articleId) {
  const [rows] = await connection.execute(
    `SELECT * FROM Likes WHERE article_id = ?`,
    [articleId]
  );
  return rows;
}

async function getLikeCount(articleId) {
  const [rows] = await connection.execute(
    `SELECT COUNT(*) FROM Likes WHERE article_id = ?`,
    [articleId]
  );
  return rows;
}

async function getUserLikeCount(userId) {
  const [rows] = await connection.execute(
    `SELECT COUNT(*) FROM Likes WHERE user_id = ?`,
    [userId]
  );
  return rows;
}

async function getLikeCountAll(userId) {
  // get all the like that a user has received across all articles
  const [rows] = await connection.execute(
    `SELECT COUNT(*) FROM
    Likes LEFT JOIN Articles A on A.id = Likes.article_id
    WHERE A.writer_id = ?`,
    [userId]
  );
  return rows;
}

module.exports = {
  getLikeCountAll,
  getUserLikeCount,
  getLikeCount,
  allLikes,
  createLike,
  deleteLike,
  getLikeById,
  getLikeByUserId,
  getLikeByArticleId,
};