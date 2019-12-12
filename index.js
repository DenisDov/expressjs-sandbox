const express = require("express");
const path = require("path");
const mysql = require("mysql");

const logger = require("./utils/logger");

const app = express();
// app.use(logger); // Middleware

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable pug templates
app.set("view engine", "pug");

// if (contentType == "text/html" && extname == "") filePath += ".html";

/* GET home page. */
app.get("/", (req, res) => {
  res.render("index", { title: "Homepage", message: "Homepage" });
});
/* GET about page. */
app.get("/about", (req, res) => {
  res.render("about", { title: "About", message: "About page" });
});

// Set static folder for css,js,imgs
app.use(express.static(path.join(__dirname, "public")));

// Users API router
app.use("/api/users", require("./routes/api/users"));

// Create dynamic port based on server
const PORT = process.env.PORT || 5000;

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "acme"
});

db.connect();

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.render("users", { title: "Users", result });
  });
});
// END MySQL code

// Handle 404 page
app.use((req, res, next) => {
  res.status(404);
  res.render("404", { title: "404" });
});

app.listen(PORT, () => console.log("Server running..."));
