const express = require("express");
const app = express();
const db = require("./db");
const envs = require("./config/_envs");
const morgan = require("morgan");
const cors = require("cors");
const { Artist, Product, Cart, User } = require("./models");
const routes = require("./routes");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); // esta librería es para poder trabajar front con back en localhost
app.use(morgan("dev"));
app.use(express.json());

// Express Routing
app.use("/api", routes);

// ERROR MIDDLEWARE
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(500).send(err);
});

db.sync({ force: false }).then(() => {
  app.listen(envs.PORT, () => console.log(`SERVER ON PORT: ${envs.PORT}`));
});

module.exports = app;
