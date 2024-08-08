import { Router } from "express";

import { getCommentsByUserId } from "../models/commentModel.js";

const router = Router();

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

export default router;
