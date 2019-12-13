require("dotenv").config({ path: "./config/.env" });
// OR
// const PORT = require("./config/options.json5").port;
const PORT = process.env.PORT;
if (process.env.NODE_ENV === "production") console.log("Server started in production mode");
else {
    require("console-stamp")(console, "mm-dd HH:MM:ss");
    console.log(`Server started in dev mode on port ${PORT}`);
}

const express = require("express"),
    app = express();
const path = require("path");
const mysql = require("mysql");

// const logger = require("./utils/logger");

// app.use(logger); // Middleware

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable pug templates
app.set("view engine", "pug");

// Set static folder for css,js,imgs & compile less
app.use(require("less-middleware")(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/api/users", require("./routes/api/users"));

// const PORT = require("./config/options.json5").port;
// // const PORT = process.env.PORT || 5000;

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

app.listen(PORT);
