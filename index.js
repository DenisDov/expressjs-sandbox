const express = require("express");
// const path = require("path");

const logger = require("./utils/logger");

const app = express();
app.use(logger); // Middleware

// Body papser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set pug engine
app.set("view engine", "pug");

/* GET home page. */
app.get("/", (req, res) => {
  res.render("index", { title: "Homepage", message: "Homepage" });
});
/* GET about page. */
app.get("/about", (req, res) => {
  res.render("about", { title: "About", message: "About page" });
});

// Set static folder
// app.use(express.static(path.join(__dirname, "public")));

// Users API router
app.use("/api/users", require("./routes/api/users"));

// Create dynamic port based on server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running..."));
