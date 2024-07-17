const express = require("express");
const fs = require("fs");
const path = require("path");
const marked = require("marked");
const router = express.Router();

router.get("/articles/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "articles", filename);

  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("File not found");
    }
    const html = marked(data);
    res.send(html);
  });
});

module.exports = router;
