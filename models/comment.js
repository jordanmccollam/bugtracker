var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.String,
        ref: "User"
    }
});

module.exports = mongoose.model("Comment", CommentSchema);