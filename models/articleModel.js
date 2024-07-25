const connection = require("../database/connection");

async function getBestArticles(time_period="week", limit=5) {
    let days = 7;

    switch(time_period) {
        case "week":
            days = 7;
            break;
        case "month":
            days = 30;
            break;
        case "year":
            days = 365;
            break;
        default:
            days = 7;
            break;
    }

    // select the best which means the one with most likes and comments
    // note to get the number of likes and comments you need to join the tables with Likes and Comments
    const [rows] = await connection.execute(
        `SELECT Articles.id, Articles.title, COUNT(Likes.id) as likes, COUNT(Comments.id) as comments
        FROM Articles
        LEFT JOIN Likes ON Articles.id = Likes.article_id
        LEFT JOIN Comments ON Articles.id = Comments.article_id
        WHERE Articles.created_at > DATE_SUB(NOW(), INTERVAL ? DAY)
        GROUP BY Articles.id
        ORDER BY likes DESC, comments DESC
        LIMIT ?`,
        [days, limit]
    );

    return rows;
}

async function getAllArticles(article) {
    const [rows] = await connection.execute(
        `SELECT * FROM Articles`
    );

    return rows;
}

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
    getBestArticles,
    postArticle,
    getArticleByTitle,
    getArticleById,
    getAllArticles,
    updateArticle,

}