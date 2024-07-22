const connection = require("../database/connection");

async function postArticle(article) {
  const { writer_id, title } = article;

  const rows = await connection.execute(
    `INSERT INTO Articles (writer_id, title) VALUES (?, ?)`,
    [writer_id, title]
  );

  return rows;
}

async function getArticleByTitle(title) {
    // not exact title, but contains
    const [rows] = await connection.execute(
        `SELECT * FROM Articles WHERE title LIKE CONCAT('%', ?, '%')`,
        [title]
    );

    return rows;
}

async function getArticleById(article_id)
{
    const [rows] = await connection.execute(
        `SELECT * FROM Articles WHERE id = ?`,
        [article_id]
    );

    return rows;
}

async function updateArticle(article_id, title) {

    const [rows] = await connection.execute(
        `UPDATE Articles SET title = ? WHERE id = ?`,
        [title, article_id]
    );

    return rows;
}

module.exports = {
    postArticle,
    getArticleByTitle,
    getArticleById,
    updateArticle,
}