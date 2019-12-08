var db = require("../models");

module.exports = function(app, isLoggedIn) {

    app.get("/projects", isLoggedIn, function(req, res) {



        res.render("projects", data = {
            user: req.user
        });
    })

}