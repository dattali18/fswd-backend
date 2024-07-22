const express = require("express");

const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const auth = require("../utils/authMiddleware")

const { postArticle, getArticleByTitle, getArticleById, updateArticle } = require("../models/articleModel");

const router = express.Router();

// GET - api/articles/:article_id/article
router.get("/:article_id/article", (req, res) => {
  const article_id = req.params.article_id;
  const filename ="article" + article_id + ".md";
  // the path to the file
  // go up one level
  const parentDir = path.join(__dirname, "..");
  const filepath = path.join(parentDir, "articles", filename);

  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("File not found");
    }
    const html = marked(data);
    res.send(html);
  });
});

router.post("/", auth, async (req, res) => {
  // we get the writer_id, title, and the content is a .md file the will be stored in the articles folder
  // with the name article{article_id}.md
    const { writer_id, title, content } = req.body;

    const [response] = await postArticle({ writer_id, title });

    const article_id = response.insertId;

    const filename = "article" + article_id + ".md";

    const parentDir = path.join(__dirname, "..");
    const filepath = path.join(parentDir, "articles", filename);

    fs.writeFile(filepath, content, (err) => {
      if (err) {
        return res.status(500).send("Error writing file");
      }

      res.send("Article created successfully");
    });
});

// GET - api/articles?title=article_title
router.get("/", async (req, res) => {
  const title = req.query.title;

  const [article] = await getArticleByTitle(title);

  if (article) {
    res.send(article);
  } else {
    res.status(404).send("Article not found");
  }
});

// GET - api/articles/:article_id
router.get("/:article_id", async (req, res) => {
  const article_id = req.params.article_id;
  // get the article object from the database
    try {
        const [article] = await getArticleById(article_id);
        if (article) {
            res.send(article);
        } else {
            res.status(404).send("Article not found");
        }
    } catch (error) {
        res.status(500).send("Error getting article");
    }

});

// for editing the article
// PUT - api/articles/:article_id/article
router.put("/:article_id/article", auth, async (req, res) => {
  const article_id = req.params.article_id;
  const { title, content } = req.body;

  const filename = "article" + article_id + ".md";

  const parentDir = path.join(__dirname, "..");
  const filepath = path.join(parentDir, "articles", filename);

  fs.writeFile(filepath, content, (err) => {
    if (err) {
      return res.status(500).send("Error writing file");
    }

    res.send("Article updated successfully");
  });
});

// for editing the article object in the database
// PUT - api/articles/:article_id
router.put("/:article_id", auth, async (req, res) => {
    const article_id = req.params.article_id;
    const { title } = req.body;

    try {
        const [response] = await updateArticle(article_id, title);

        if (response.affectedRows > 0) {
            res.send("Article updated successfully");
        } else {
            res.status(404).send("Article not found");
        }
    } catch (error) {
        res.status(500).send("Error updating article");
    }
});


module.exports = router;
