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
        }).populate("sharedProjects").then(function(dbUser) {

            var projects = dbUser.projects;
            var sharedProjects = dbUser.sharedProjects;

            res.render("dashboard", data = {
                user: req.user,
                projects: projects,
                sharedProjects: sharedProjects
            })
        }).catch(function(err) {
            console.log(err);
        });
    });

}