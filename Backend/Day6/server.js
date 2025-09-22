const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;
const DATA_FILE = "data/posts.json";

app.use(cors());
app.use(express.json());

app.post("/api/posts", (req, res) => {
  const { content, author, tags } = req.body;

  if (!content || content.length < 1 || content.length > 280) {
    return res.status(400).json({ error: "Content must be 1-280 characters" });
  }
  if (!author) {
    return res.status(400).json({ error: "Author is required" });
  }

  let safeTags = [];
  if (Array.isArray(tags)) {
    safeTags = tags.slice(0, 5); 
  }

  const newPost = {
    postId: Date.now(),
    content,
    author,
    tags: safeTags,
    createdAt: new Date().toISOString(),
    likes: 0,
    status: "published"
  };

  fs.promises.readFile(DATA_FILE, "utf-8")
    .then(data => {
      let posts = [];
      try {
        posts = JSON.parse(data);
      } catch (err) {
        posts = [];
      }
      posts.unshift(newPost);
      return fs.promises.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
    })
    .then(() => res.status(201).json(newPost))
    .catch(err => res.status(500).json({ error: "Server error", details: err }));
});

app.get("/api/posts", (req, res) => {
  fs.promises.readFile(DATA_FILE, "utf-8")
    .then(data => {
      let posts = [];
      try {
        posts = JSON.parse(data);
      } catch (err) {
        posts = [];
      }
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.json(posts);
    })
    .catch(err => res.status(500).json({ error: "Server error", details: err }));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
