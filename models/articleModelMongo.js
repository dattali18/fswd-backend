// models/Article.js
import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
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

export default model("Article", ArticleSchema);
