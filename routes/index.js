const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
    const userLocale = req.acceptsLanguages()[0];
    res.render("index", { title: "Homepage", message: "Homepage", userLocale });
});
/* GET about page. */
router.get("/about", (req, res) => {
    res.render("about", { title: "About", message: "About page" });
});

router.get("/info", (req, res) => {
    const myURL = new URL("http://example.com/hello.html?id=8f35490242&status=active");
    const refID = myURL.searchParams.get("id");
    const data = {
        refID
    };
    res.render("info", { title: "Info", data });
});

module.exports = router;
