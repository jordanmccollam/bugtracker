var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Comment", CommentSchema);