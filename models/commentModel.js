import connection from "../database/connection.js";

async function getCommentsByUserId(user_id) {
    const [rows] = await connection.execute(
        `SELECT * FROM Comments WHERE user_id = ?`,
        [user_id]
    );

    return rows;
}

export {
    getCommentsByUserId
}