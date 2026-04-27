const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
const postsRouter = require("./routers/postsRouter.js");
const errorsHandler = require("./middlewares/errorHandler.js");
const notFound = require("./middlewares/notFound.js");

app.use(express.json());
app.use("/posts", postsRouter);

app.use(errorsHandler);

app.use(notFound);

app.listen(port, () => {
  console.log(`Connessione attiva sulla porta: ${port}`);
});
