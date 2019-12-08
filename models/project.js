var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Project", ProjectSchema);