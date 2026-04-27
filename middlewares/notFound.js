function notFound(req, res, next) {
  res.status(404);
  res.json({
    eorro: "Not found",
    message: "Pagina non trovata",
  });
}

module.exports = notFound;
