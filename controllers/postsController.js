const posts = require("../data/posts");
const connection = require("../data/db");

//index
function index(req, res) {
  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

//show
function show(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404);
    return res.json({
      status: "404",
      error: "Not found",
      message: "Post non trovato",
    });
  }
  res.json(post);
}

//store
function store(req, res) {
  const newId = posts[posts.length - 1].id + 1;
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };
  posts.push(newPost);

  res.status(201);
  res.json(newPost);

  console.log(newPost);
}

//update
function update(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404);
    return res.json({
      error: "Not fount",
      message: "Post non trovato",
    });
  }

  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  res.json(post);

  console.log(posts);
}

//modify
function modify(req, res) {}

//destroy
function destroy(req, res) {
  const { id } = req.params;

  const sql = "DELETE FROM posts WHERE id = ?";

  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete post" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.sendStatus(204);
  });
}

module.exports = { index, show, store, update, modify, destroy };
