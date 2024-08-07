// models/Article.js
const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  db_id: {
    type: String,
    required: true,
  },
  writer_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", ArticleSchema);
