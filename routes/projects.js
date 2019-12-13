var db = require("../models");

module.exports = function(app, isLoggedIn) {

    // GET project page
    app.get("/projects/:id", isLoggedIn, function(req, res) {
        var id = req.params.id;

        db.Project.findOne({_id: id}).populate("issues").then(function(dbProject) {

            res.render("issues", data = {
                user: req.user,
                project: dbProject
            })

        }).catch(function(err) {
            if (err) {console.log(err)};
        })
    });

    // JSON request to feed the comment content
    app.get("/comment/:id", function(req, res) {
        var id = req.params.id;

        db.Issue.findOne({_id: id}).populate("comments").then(function(dbIssue) {
            res.json({
                comments: dbIssue.comments
            });
        }).catch(function(err) {
            if (err) {console.log(err)};
        });
    });

    // UPDATE ---
    // Updates an issues category
    app.put("/update/:id", function(req, res) {
        var id = req.params.id;

        db.Issue.updateOne({_id: id}, {category: req.body.category})
        .then(function(dbIssue){}).catch(function(err) {
            console.log(err);
        });
    });
}