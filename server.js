const express = require("express");
const app = express();
const db = require("./db");
const morgan = require("morgan");
const cors = require("cors");
const { Artist, Product, Cart, User, Checkout } = require("./models");
const routes = require("./routes");

app.use(cors({
	origin: ['https://front-klimty.vercel.app', 'http://localhost:3000'],
	credentials: true
}))
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
  app.listen(3001, () => console.log(`SERVER ON PORT: ${3001}`));
});

module.exports = app;