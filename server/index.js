const path = require("path");
const express = require("express");
require("dotenv").config();
const activitiesController = require("./controllers/activities");
const usersController = require("./controllers/users");
const PORT = process.env.PORT ?? 8000;

const app = express();
//Middleware
// CORS
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://dynamics25project.onrender.com",
    "http://localhost:5173",
    "https://localhost:5173",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());
//Controllers
app
  .get("/", (req, res) => {
    res.send("Hello World");
  })
  .use("/api/v1/activities", activitiesController)
  .use("/api/v1/users", usersController);

app.use(express.static(path.join(__dirname, "../dist")));

// Catch-all for frontend (Vue.js) routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});
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
