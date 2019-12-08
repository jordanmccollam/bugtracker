var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);


// EXAMPLE SCHEMA ***************************************
// var Schema = mongoose.Schema;

// var ArticleSchema = new Schema({
//     headline: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     summary: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     url: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     note: {
//         type: Schema.Types.ObjectId,
//         ref: "Note"
//     }
// });

// var Article = mongoose.model("Article", ArticleSchema);

// module.exports = Article;