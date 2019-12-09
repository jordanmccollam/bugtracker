var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    issues: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }
});

module.exports = mongoose.model("Project", ProjectSchema);