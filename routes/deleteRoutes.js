var db = require("../models");

module.exports = function (app) {

    // DELETE ---

    // Delete project
    app.delete("/delete/:id", function (req, res) {
        var id = req.params.id;

        db.Project.findOne({
            _id: id
        }).populate("issues").then(function (dbProject) {

            // Loop through every issue and delete its comments
            for (var i = 0; i < dbProject.issues.length; i++) {
                db.Comment.remove({
                    _id: {
                        $in: dbProject.issues[i].comments
                    }
                }, function (err) {
                    if (err) {
                        console.log(err)
                    };
                })
            }

            // Delete the projects issues
            db.Issue.remove({
                _id: {
                    $in: dbProject.issues
                }
            }, function (err) {
                if (err) {
                    console.log(err)
                };

                // Delete from parent(s)
                for (var j = 0; j < dbProject.users.length; j++) {
                    db.User.updateOne(
                        {username: dbProject.users[j]},
                        { $pull: {sharedProjects: id}}
                    ).then(function(dbUser){
                        console.log("REMOVED SHARED");
                    }).catch(function(err) {
                        if (err) {console.log(err)};
                    });
                }

                db.User.findOneAndUpdate({
                    _id: req.user.id
                }, {
                    $pull: {
                        projects: id
                    }
                }).then(function (dbUser) {
                    console.log("REMOVED " + id);
                }).catch(function (err) {
                    if (err) {
                        console.log(err)
                    }
                });

                // Delete project
                dbProject.remove();

            });

        }).catch(function (err) {
            if (err) {
                console.log(err)
            };
        });

    });

    // Delete Issue
    app.delete("/delete/:projectID/:issueID", function (req, res) {
        var projectID = req.params.projectID;
        var issueID = req.params.issueID;

        db.Issue.findOne({
            _id: issueID
        }).then(function (dbIssue) {

            // Delete the issues comments
            db.Comment.remove({
                _id: {
                    $in: dbIssue.comments
                }
            }, function (err) {
                if (err) {
                    console.log(err)
                };

                // Delete project and redirect
                dbIssue.remove();

                // Delete from parent
                db.Project.findOneAndUpdate({
                    _id: projectID
                }, {
                    $pull: {
                        issues: issueID
                    }
                }).then(function (dbProject) {}).catch(function (err) {
                    if (err) {
                        console.log(err)
                    }
                });

            });

        }).catch(function (err) {
            if (err) {
                console.log(err)
            };
        });
    });

}