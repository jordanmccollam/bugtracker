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

    app.get("/projects/:id", isLoggedIn, function(req, res) {
        var id = req.params.id;

        db.Project.findOne({_id: id}).populate("issues").then(function(dbProject) {
            console.log(dbProject);

            res.render("issues", data = {
                user: req.user,
                project: dbProject
            })

        }).catch(function(err) {
            if (err) {console.log(err)};
        })
    });

    // POST ---
    app.post("/addproject", function(req, res) {
        var projectID;
        db.Project.create(req.body).then(function(dbProject) {
            projectID = dbProject._id;
            return db.User.findOneAndUpdate(
                {_id: req.user.id},
                { $push: {projects: dbProject.id}},
                {new: true}
            );
        }).then(function(dbUser) {
            res.redirect("/projects/" + projectID);
        }).catch(function(err) {
            console.log(err);
        });
    });

    app.post("/addissue/:id", function(req, res) {
        var id = req.params.id

        db.Issue.create(req.body).then(function(dbIssue) {
            issue = dbIssue;
            return db.Project.findOneAndUpdate(
                {_id: id},
                { $push: {issues: dbIssue.id}},
                {new: true}
            );
        }).then(function(dbProject) {
            res.redirect("/projects/" + id);
        }).catch(function(err) {
            res.redirect("/projects");
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

}