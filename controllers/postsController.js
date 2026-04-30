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
  const id = req.params.id;
  const sql = `
  SELECT *
  FROM posts
  INNER JOIN post_tag ON posts.id = post_tag.post_id
  INNER JOIN tags ON post_tag.tag_id = tags.id
  WHERE posts.id = ?
`;

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(550).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Post not found" });
    res.json(results[0]);
  });
}

//store
function store(req, res) {
  const { title, content, image } = req.body;
  const sql = "INSERT INTO posts (title, content, image) VALUES (?, ?, ?)";

  connection.query(sql, [title, content, image], (err, results) => {
    if (err) return (res.status(500), json({ error: "Failed to insert post" }));
    res.status(201);
    res.json({ id: results.insertId });
  });
}

//update
function update(req, res) {
  const { id } = req.params;
  const { title, content, image } = req.body;
  const sql = "UPDATE posts SET title=?, content=?, image=? WHERE id=?";

  connection.query(sql, [title, content, image, id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to update post" });
    res.json({ message: "Post update successfully!" });
  });
}

//modify
function modify(req, res) {}

//destroy
function destroy(req, res) {
  const id = req.params.id;
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
