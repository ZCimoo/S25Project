const express = require("express");
const activitiesController = require("./controllers/activities");
const PORT = 8000;

const app = express();
//Middleware
app.use(express.json());
app
  .get("/", (req, res) => {
    res.send("Hello World");
  })
  .use("/api/v1/activities", activitiesController);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

console.log("Hello World");
