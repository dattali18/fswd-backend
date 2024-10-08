import connection from "../database/connection.js";

async function getAllUserArticles(user_id) {
  const [rows] = await connection.execute(
    `SELECT * FROM Articles WHERE writer_id = ?`,
    [user_id]
  );

  return rows;
}

async function getBestArticles(time_period = "week", limit = 5) {
  let days = 7;

  switch (time_period) {
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

  // select all the articles that have been created within the last 'days' days
  // const [rows] = await connection.execute(
  //   `
  //       SELECT * FROM Articles 
  //       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY) 
  //       ORDER BY created_at DESC
  //       LIMIT ?
  //   `,
  //   [days, limit]
  // );

  const [rows] = await connection.execute(
    "SELECT * FROM Articles ORDER BY created_at DESC LIMIT ?",
    [limit]
  );

  return rows;
}

// Create a function to get paginated articles
async function getPaginatedArticles(page, limit) {
  const limitInt = parseInt(limit, 10);
  const pageInt = parseInt(page, 0);

  // Calculate the offset
  const offset = (pageInt - 1) * limitInt;

  try {
    // Query to get articles with pagination
    const [rows] = await connection.execute("SELECT * FROM Articles");

    const paginatedRows = rows.slice(offset, offset + limitInt);

    // Query to get the total number of articles (for pagination info)
    const [countRows] = await connection.execute(
      "SELECT COUNT(*) as total FROM Articles"
    );

    const totalArticles = countRows[0].total;
    const totalPages = Math.ceil(totalArticles / limit);

    return {
      data: paginatedRows,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalArticles: totalArticles,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated articles:", error);
    throw new Error("Could not fetch paginated articles");
  }
}

async function getAllArticles(page = 0, limit = 5) {
  console.log(page, limit);
  // add pagination
  const offset = (page - 1) * limit;
  const [rows] = await connection.execute(
    `SELECT * FROM Articles LIMIT ? OFFSET ?`,
    [limit, offset]
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

async function getArticlesByUserId(user_id) {
  const [rows] = await connection.execute(
    `SELECT * FROM Articles WHERE writer_id = ?`,
    [user_id]
  );

  return rows;
}

async function getArticleById(article_id) {
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

export {
  getAllArticles,
  getAllUserArticles,
  getArticleById,
  getArticleByTitle,
  getBestArticles,
  getPaginatedArticles,
  postArticle,
  updateArticle,
};
