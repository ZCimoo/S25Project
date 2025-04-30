const express = require("express");
const activitiesController = require("./controllers/activities");
const usersController = require("./controllers/users");
const PORT = 8000;

const app = express();
//Middleware
app.use(express.json());
app
  .get("/", (req, res) => {
    res.send("Hello World");
  })
  .use("/api/v1/activities", activitiesController)
  .use("/api/v1/users", usersController);

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
  console.log(`Server running at http://localhost:${PORT}/`);
});

console.log("Hello World");
