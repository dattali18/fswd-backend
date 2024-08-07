const express = require("express");

// const fs = require("fs");
// const path = require("path");
// const { marked } = require("marked");

const auth = require("../utils/authMiddleware")

const { getCommentsByUserId } = require("../models/commentModel");

const router = express.Router();

// GET - api/comments?user_id=user_id's_comments
router.get("/", async (req, res) => {
    const userId = req.query.user_id;
    console.log(userId)
    try {
        const comments = await getCommentsByUserId(userId);
        res.send(comments);
    } catch (error) {
        res.status(500).send("Error getting comments");
    }
});

module.exports = router;
