var db = require("../models");

module.exports = function (app) {

    // POST ---
    app.post("/addproject", function (req, res) {
        var projectID;
        db.Project.create(req.body).then(function (dbProject) {
            projectID = dbProject._id;
            return db.User.findOneAndUpdate({
                _id: req.user.id
            }, {
                $push: {
                    projects: dbProject.id
                }
            }, {
                new: true
            });
        }).then(function (dbUser) {

            res.redirect("/projects/" + projectID);

        }).catch(function (err) {
            if (err) {
                console.log(err)
            };
        });
    });

    app.post("/addissue/:id", function (req, res) {
        var id = req.params.id;

        db.Issue.create(req.body).then(function (dbIssue) {
                return db.Project.findOneAndUpdate({
                    _id: id
                }, {
                    $push: {
                        issues: dbIssue.id
                    }
                }, {
                    new: true
                });
        }).then(function (dbProject) {

            res.redirect("/projects/" + id);

        }).catch(function (err) {
            if (err) {
                console.log(err)
            };
        });

        // db.Issue.create(req.body).then(function (dbIssue) {
        //     return db.Project.findOneAndUpdate({
        //         _id: id
        //     }, {
        //         $push: {
        //             issues: dbIssue.id
        //         }
        //     }, {
        //         new: true
        //     });
        // }).then(function (dbProject) {

        //     res.redirect("/projects/" + id);

        // }).catch(function (err) {
        //     if (err) {console.log(err)};
        // });
    });

    // new comment
    app.post("/newcomment/:issueID", function (req, res) {
        var issueID = req.params.issueID;

        db.Comment.create(req.body).then(function (dbComment) {
            return db.Issue.findOneAndUpdate({
                _id: issueID
            }, {
                $push: {
                    comments: dbComment.id
                }
            }, {
                new: true
            })
        }).then(function (dbIssue) {

            res.redirect("back");

        }).catch(function (err) {
            if (err) {
                console.log(err)
            };
        });
    });

}