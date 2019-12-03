

module.exports = function(app) {

    // Home page
    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/projects", function(req, res) {
        res.render("projects");
    });
}