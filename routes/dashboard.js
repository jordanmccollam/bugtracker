var db = require("../models");

module.exports = function(app, isLoggedIn) {

    app.get("/dashboard", isLoggedIn, function(req, res) {
        res.render("dashboard", data = {
            user: req.user
        });
    });

}