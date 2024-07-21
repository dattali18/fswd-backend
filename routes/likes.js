const express = require("express");

const { createLike, deleteLike, getLikeCountAll, getUserLikeCount, getLikeCount } = require("../models/likeModel");

const router = express.Router();

// like an article
router.post("/:articleId", async (req, res) => {
    // Get the article ID from the request parameters
    const articleId = req.params.articleId;
    // Get the user ID from the request body
    const userId = req.body.userId;

    try {
        const response = await createLike({ user_id: userId, article_id: articleId });
        return res.send(`Like article ${articleId}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send("An error occurred while creating the like");
    }
});

// unlike an article
router.delete("/:articleId", async (req, res) => {
    // Get the article ID from the request parameters
    const articleId = req.params.articleId;
    // Get the user ID from the request body
    const userId = req.body.userId;

    // Delete the like
    try {
        await deleteLike({ user_id: userId, article_id: articleId });
        return res.send(`Unlike article ${articleId}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send("An error occurred while deleting the like");
    }
});

// get the count of likes for an article
router.get("/:articleId/count", async (req, res) => {
    const articleId = req.params.articleId;

    try {
        const count = await getLikeCount(articleId);
        return res.json(count);
    } catch (err) {
        console.error(err);
        return res.status(500).send("An error occurred while getting the like count");
    }
});

// get all the count a user has liked
router.get("/:userId/count", async (req, res) => {
    const userId = req.params.userId;
    try {
        const count = await getUserLikeCount(userId);
        return res.json(count);
    } catch (err) {
        console.error(err);
        return res.status(500).send("An error occurred while getting the like count");
    }
});

// get the count of likes across all articles
router.get("/count", async (req, res) => {
    const userId = req.body.userId;
    try {
        const count = await getLikeCountAll(userId);
        return res.json(count);
    } catch (err) {
        console.error(err);
        return res.status(500).send("An error occurred while getting the like count");
    }
});

module.exports = router;