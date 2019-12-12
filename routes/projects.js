var db = require("../models");

module.exports = function(app, isLoggedIn) {

    app.get("/projects", isLoggedIn, function(req, res) {

        db.User.findOne({_id: req.user.id}).populate("projects").then(function(dbUser) {

            var projects = dbUser.projects;

            res.render("projects", data = {
                user: req.user,
                projects: projects
            })
        }).catch(function(err) {
            console.log(err);
        });
    });

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

    // JSON request
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

    // DELETE ---
    app.delete("/delete/:id", function(req, res) {
        var id = req.params.id;

        db.Project.deleteOne({_id: id}).then(function(dbProject) {
            
            db.User.findOneAndUpdate(
                {_id: req.user.id},
                { $pull: {projects: id}}
            ).then(function(dbUser) {
                console.log("REMOVED " + id);
            }).catch(function(err) {
                if (err) {console.log(err)}
            });

        }).catch(function(err) {
            if (err) {console.log(err)};
        });
    });

    app.delete("/delete/:projectID/:issueID", function(req, res) {
        var projectID = req.params.projectID;
        var issueID = req.params.issueID;

        db.Issue.deleteOne({_id: issueID}).then(function(dbIssue) {
            
            db.Project.findOneAndUpdate(
                {_id: projectID},
                { $pull: {issues: issueID}}
            ).then(function(dbUser) {
                console.log("REMOVED " + id);
            }).catch(function(err) {
                if (err) {console.log(err)}
            });

        }).catch(function(err) {
            if (err) {console.log(err)};
        });
    });

    // app.delete("/deletecomment/:issueID/:commentID", function(req, res) {
    //     var issueID = req.params.issueID;
    //     var commentID = req.params.commentID;

    //     db.Comment.deleteOne({_id: commentID}).then(function(dbComment) {
            
    //         db.Issue.findOneAndUpdate(
    //             {_id: issueID},
    //             { $pull: {comments: commentID}}
    //         ).then(function(dbIssue) {
    //             console.log("REMOVED " + id);
    //         }).catch(function(err) {
    //             if (err) {console.log(err)}
    //         });

    //     }).catch(function(err) {
    //         if (err) {console.log(err)};
    //     });
    // });

    // UPDATE ---
    app.put("/update/:id", function(req, res) {
        var id = req.params.id;

        db.Issue.updateOne({_id: id}, {category: req.body.category})
        .then(function(dbIssue){}).catch(function(err) {
            console.log(err);
        });
    });
}