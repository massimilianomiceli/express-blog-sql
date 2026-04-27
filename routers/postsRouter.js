const express = require("express");
const postsRouter = express.Router();
const postsController = require("../controllers/postsController.js");

//index
postsRouter.get("/", postsController.index);

//show
postsRouter.get("/:id", postsController.show);

//store
postsRouter.post("/", postsController.store);

//update
postsRouter.put("/:id", postsController.update);

//modify
postsRouter.patch("/:id", postsController.modify);

//destroy
postsRouter.delete("/:id", postsController.destroy);

module.exports = postsRouter;
