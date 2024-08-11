import { Router } from "express";

import Article from "../models/articleModelMongo.js";

import auth from "../utils/authMiddleware.js";

import {
  getAllArticles,
  getAllUserArticles,
  getArticleById,
  getArticleByTitle,
  postArticle,
  updateArticle,
  getPaginatedArticles,
} from "../models/articleModel.js";

const router = Router();

/**
 * @desc Get the content of the article (in .md format)
 * @route GET /api/articles/:article_id/content
 * @access Public
 * @param article_id
 */
router.get("/:article_id/content", async (req, res) => {
  const article_id = req.params.article_id;

  // get the article object from the mongoDB database
  try {
    const article = await Article.find({ db_id: article_id });
    if (article) {
      res.send(article);
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    res.status(500).send("Error getting article");
  }
});

/**
 * @desc Get the article object
 * @route GET /api/articles/:article_id
 * @access Public
 * @param article_id
 */
router.get("/:article_id", async (req, res) => {
  // get the article object form the MySQL database
  const article_id = req.params.article_id;

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

/**
 * @desc     Create an article and store it in the databases (MySQL and MongoDB)
 * @route    POST api/articles
 * @access   Private
 * @param writer_id
 * @param title
 * @param content
 * @param tags
 */
router.post("/", async (req, res) => {
  const { writer_id, title, content, tags } = req.body;

  try {
    const [response] = await postArticle({ writer_id, title });

    const newArticle = new Article({
      db_id: response.insertId,
      writer_id,
      title,
      content,
      tags,
    });

    const article = await newArticle.save();

    // check if the article was saved
    if (response.affectedRows > 0) {
      res.json(article);
    } else {
      return res.status(500).send("Internal server error");
    }

    // res.json(article);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

/**
 * @route GET api/articles
 * @param user - the id of the user
 * @param title - the title of the article to search for if no title is given return all articles
 * @param page - the page number to get the articles from
 * @param limit - the number of articles to get
 * @desc Get the article with the title = title
 * */
router.get("/", async (req, res) => {
  const user = req.query.user;

  if(user) {
    const articles = await getAllUserArticles(user);
    return res.send(articles);
  }

  const title = req.query.title;

  if(title) {
    const [article] = await getArticleByTitle(title);
    if (article) {
      return res.send(article);
    } else {
      return res.status(404).send("Article not found");
    }
  }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;


    const articles = await getPaginatedArticles(page, limit);

    if (articles) {
      return res.send(article);
    } else {
      return res.status(404).send("Article not found");
    }
  });


/**
 * @desc Update the content of the article
 * @route PUT /api/articles/:article_id/content
 * @access Private
 */
router.put("/:article_id/content", auth, async (req, res) => {
  // update the content of the article in the MongoDB database
  const article_id = req.params.article_id;
  const { content } = req.body;

  try {
    const article = await findByIdAndUpdate(
      article_id,
      { content },
      { new: true }
    );

    if (article) {
      res.send(article);
    }

    res.status(404).send("Article not found");
  } catch (error) {
    res.status(500).send("Error updating article");
  }
});

/**
 * @desc Update the article object
 * @route PUT /api/articles/:article_id
 * @access Private
 * @param article_id
 */
router.put("/:article_id", auth, async (req, res) => {
  const article_id = req.params.article_id;
  // update both MondoDB and MySQL
  const { title } = req.body;

  try {
    const [response] = await updateArticle(article_id, title);

    // update the MongoDB database
    const article = await findByIdAndUpdate(
      article_id,
      { title },
      { new: true }
    );

    // check if the article was updated in both databases
    if (response.affectedRows > 0 && article) {
      res.json(article);
    } else {
      return res.status(500).send("Internal server error");
    }
  } catch (error) {
    res.status(500).send("Error updating article");
  }
});

/**
 * @route    GET api/articles
 * @desc     Get all articles
 * */
router.get("/", async (req, res) => {
  try {
    const articles = await find().exec();
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
