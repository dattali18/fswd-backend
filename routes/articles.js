const express = require("express");

const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const auth = require("../utils/authMiddleware")

const { postArticle, getArticleByTitle, getArticleById, updateArticle, getAllArticles, getBestArticles } = require("../models/articleModel");

const router = express.Router();

// GET - api/articles/:article_id/article
// router.get("/:article_id/article", (req, res) => {
//   const article_id = req.params.article_id;
//   const filename ="article" + article_id + ".md";
//   // the path to the file
//   // go up one level
//   const parentDir = path.join(__dirname, "..");
//   const filepath = path.join(parentDir, "articles", filename);

//   fs.readFile(filepath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(404).send("File not found");
//     }
//     const html = marked(data);
//     res.send(html);
//   });
// });

// router.post("/", auth, async (req, res) => {
//   // we get the writer_id, title, and the content is a .md file the will be stored in the articles folder
//   // with the name article{article_id}.md
//     const { writer_id, title, content } = req.body;

//     const [response] = await postArticle({ writer_id, title });

//     const article_id = response.insertId;

//     const filename = "article" + article_id + ".md";

//     const parentDir = path.join(__dirname, "..");
//     const filepath = path.join(parentDir, "articles", filename);

//     fs.writeFile(filepath, content, (err) => {
//       if (err) {
//         return res.status(500).send("Error writing file");
//       }

//       res.send("Article created successfully");
//     });
// });

// GET - api/articles?title=article_title
router.get("/", async (req, res) => {
  const title = req.query.title;

  if(!title) {
      const articles = await getAllArticles();
      return res.send(articles)
  }

  const [article] = await getArticleByTitle(title);

  if (article) {
    return res.send(article);
  } else {
    return res.status(404).send("Article not found");
  }
});

// GET - api/articles/best?time_period=day
router.get("/best", async (req, res) => {
    const time_period = req.query.time_period;
    const limit = req.query.limit;

    // if there is no time_period give the best from last week
    try {
        const articles = await getBestArticles(time_period || "week", limit || 5);
        return res.send(articles);
    } catch (error) {
        // console.log(error)
        return res.status(500).send("Error getting best articles");
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
  const { content } = req.body;

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


// routes/articles.js
const Article = require('../models/articlesModel');

// @route    POST api/articles
// @desc     Create an article
// @access   Private
router.post('/', async (req, res) => {
  const { writer_id, title, content, tags } = req.body;
  try {
      const [response] = await postArticle({ writer_id, title });

    const newArticle = new Article({
      db_id:  response.insertId,
      writer_id,
      title,
      content,
      tags
    });

    const article = await newArticle.save();

    // saving the new article to the database


    // check if the article was saved
    if (response.affectedRows > 0) {
      res.json(article);
    } else {
      return res.status(500).send("Internal server error");
    }

    // res.json(article);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route GET api/articles/:id
// @desc Get the article with id_ = id
// @access Public
router.get('/:id', async  (req, res) => {
    console.log("hi")
    try {
        const article = await Article.findById(req.params.id).populate('writer', ['user_name']);
        if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
        }
        res.json(article);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Article not found' });
        }
        res.status(500).send('Server Error');
    }
})

// @route    GET api/articles
// @desc     Get all articles
// @access   Public
router.get('/all', async (req, res) => {
  try {
    const articles = await Article.find().exec();
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


