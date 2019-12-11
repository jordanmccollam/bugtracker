var db = require("../models");

module.exports = function(app, isLoggedIn) {

    app.get("/dashboard", isLoggedIn, function(req, res) {
        db.User.findOne({_id: req.user.id}).populate("projects").then(function(dbUser) {

            var projects = dbUser.projects;

            res.render("dashboard", data = {
                user: req.user,
                projects: projects
            })
        }).catch(function(err) {
            console.log(err);
        });
    });

}