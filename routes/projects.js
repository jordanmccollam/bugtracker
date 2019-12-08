var db = require("../models");

module.exports = function(app, isLoggedIn) {

    app.get("/projects", isLoggedIn, function(req, res) {

        db.User.findOne({_id: req.user.id}).populate("projects").then(function(dbUser) {
            // TODO in projects.handlebars I'm using an additional if statement.
            // It seems handlebars thinks that var project is the entire user or something
            // this should be fixed for optimization 

            var projects = dbUser.projects;

            res.render("projects", data = {
                user: req.user,
                projects: projects
            })
        }).catch(function(err) {
            console.log(err);
        });
    });

    app.post("/addproject", function(req, res) {
        db.Project.create(req.body).then(function(dbProject) {
            return db.User.findOneAndUpdate(
                {_id: req.user.id},
                {projects: dbProject.id},
                {new: true}
            );
        }).then(function(dbUser) {
            res.redirect("/projects");
        }).catch(function(err) {
            console.log(err);
        });
    });

}