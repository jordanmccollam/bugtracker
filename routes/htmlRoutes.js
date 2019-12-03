

module.exports = function(app) {

    // Home page
    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/dashboard", function(req, res) {
        res.render("/dashboard");
    });

    app.get("/projects", function(req, res) {
        res.render("projects");
    });
}