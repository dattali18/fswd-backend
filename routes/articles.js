const express = require("express");

const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const { postArticle, getArticleByTitle } = require("../models/articleModel");

const router = express.Router();

router.get("/:article_id", (req, res) => {
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

router.post("/", async (req, res) => {
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

module.exports = router;
