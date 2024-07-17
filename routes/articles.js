const express = require("express");
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const { log } = require("console");
const router = express.Router();

router.get("/articles/:filename", (req, res) => {
  const filename = req.params.filename;
  // the path to the file
  // go up one level
  const parentDir = path.join(__dirname, "..");
  const filepath = path.join(parentDir, "articles", filename);

  log(filepath);

  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("File not found");
    }
    const html = marked(data);
    res.send(html);
  });
});

module.exports = router;
