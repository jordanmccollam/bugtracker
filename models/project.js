var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }],
    users: [{
        type: mongoose.Schema.Types.String,
        ref: "User"
    }],
    owner: {
        type: String
    }
});

module.exports = mongoose.model("Project", ProjectSchema);