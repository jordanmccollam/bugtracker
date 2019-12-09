var mongoose = require("mongoose");

var IssueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("Issue", IssueSchema);