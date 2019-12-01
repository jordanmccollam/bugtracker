

module.exports = function(app) {

    // Projects page
    app.get("/projects", function(req, res) {
        res.render("projects");
    });
}