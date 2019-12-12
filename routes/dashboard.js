var db = require("../models");

module.exports = function(app, isLoggedIn) {

    app.get("/dashboard", isLoggedIn, function(req, res) {
        db.User.findOne({_id: req.user.id}).populate({
            path: "projects",
            populate: {
                path: "issues",
                model: "Issue",
                populate: {
                    path: "comments",
                    model: "Comment"
                }
            }
        }).then(function(dbUser) {

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