import { Router } from "express";

import {
  createLike,
  deleteLike,
  getLikeCount,
  getLikeCountAll,
  getUserLikeCount,
  getUserLikes,
} from "../models/likeModel.js";

const router = Router();

/**
 * @desc Like an article
 * @route POST /api/likes/:articleId
 * @access Public
 * @param articleId
 * @param userId
 * @returns {string} - Like article {articleId}
 */
router.post("/:articleId", async (req, res) => {
  // Get the article ID from the request parameters
  const articleId = req.params.articleId;
  // Get the user ID from the request body
  const userId = req.body.userId;

  try {
    const response = await createLike({
      user_id: userId,
      article_id: articleId,
    });
    return res.send(`Like article ${articleId}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error occurred while creating the like");
  }
});

/**
 * @desc Unlike an article
 * @route DELETE /api/likes/:article_id
 * @access Public
 * @param article_id
 * @param user_id
 * @returns {string} - Unlike article {article_id}
 */
router.delete("/:article_id", async (req, res) => {
  // Get the article ID from the request parameters
  const articleId = req.params.article_id;
  // Get the user ID from the request body
  const userId = req.body.user_id;

  // Delete the like
  try {
    await deleteLike({ user_id: userId, article_id: articleId });
    return res.send(`Unlike article ${articleId}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error occurred while deleting the like");
  }
});

/**
 * @desc Get the count of likes for an article
 * @route GET /api/likes/:article_id/count
 * @access Public
 * @param article_id
 * @returns {number} - Count of likes for article {article_id
 */
router.get("/:article_id/count", async (req, res) => {
  const articleId = req.params.article_id;

  try {
    const count = await getLikeCount(articleId);
    return res.json(count);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send("An error occurred while getting the like count");
  }
});

/**
 * @desc Get the count of likes for a user
 * @route GET /api/likes/:user_id/count
 * @access Public
 * @param user_id
 * @returns {number} - Count of likes for user {user_id}
 */
router.get("/:user_id/count", async (req, res) => {
  const userId = req.params.user_id;
  try {
    const count = await getUserLikeCount(userId);
    return res.json(count);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send("An error occurred while getting the like count");
  }
});

/**
 * @desc Get the count of likes across all articles
 * @route GET /api/likes/count
 * @access Public
 * @param user_id
 * @returns {number} - Count of likes across
 * all articles for user {user_id}
 */
router.get("/count", async (req, res) => {
  const userId = req.body.user_id;
  try {
    const count = await getLikeCountAll(userId);
    return res.json(count);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send("An error occurred while getting the like count");
  }
});

/**
 * @desc Get all the like a user has liked across all articles
 * @route GET /api/likes?user_id={user_id}
 * @access Public
 * @param user_id
 * @returns {array} - Array of articles liked by user {user_id}
 */
router.get("/", async (req, res) => {
  const userId = req.query.user_id;
   console.log(userId);
  try {
    const likes = await getUserLikes(userId);
    return res.json(likes);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error occurred while getting the likes");
  }
});

export default router;
