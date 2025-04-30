const express = require("express");
require("dotenv").config();
const activitiesController = require("./controllers/activities");
const usersController = require("./controllers/users");
const PORT = process.env.PORT ?? 8000;

const app = express();
//Middleware
app.use(express.json());
//Controllers
app
  .get("/", (req, res) => {
    res.send("Hello World");
  })
  .use("/api/v1/activities", activitiesController)
  .use("/api/v1/users", usersController)
  .use(express.static(path.join(__dirname, "../client/dist")));
//Error handling
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;

  const error = {
    status,
    message: err.message || "Internal Server Error",
  };
  res.status(status).send(error);
});
app.listen(PORT, () => {
  console.log(`Welcome to the best class at New Paltz - ${process.env.BEST_CLASS}
    Server is running on port http://localhost:${PORT}`);
});

console.log("Hello World");
