var db = require("../models");

module.exports = function(app, io) {

    io.on("connection", function(socket) {

        // New Comment
        socket.on("new comment", function(data) {
            var newComment;
            var issueID =  data.issueID;
            var username = data.username;

            db.Comment.create({comment: data.comment}).then(function (dbComment) {
                newComment = dbComment;
                return db.Issue.findOneAndUpdate({
                    _id: issueID
                }, {
                    $push: {
                        comments: dbComment.id
                    }
                }, {
                    new: true
                })
            }).then(function (dbIssue) {

                var data = {
                    comment: newComment,
                    issueID: issueID,
                    username: username
                }
    
                io.emit("new comment", data);
    
            }).catch(function (err) {
                if (err) {
                    console.log(err)
                };
            });
        });

        // Delete comment
        socket.on("delete comment", function(data) {
            var commentID = data.commentID;
            var issueID = data.issueID;

            db.Comment.deleteOne({_id: commentID}).then(function(dbComment) {
            
                db.Issue.findOneAndUpdate(
                    {_id: issueID},
                    { $pull: {comments: commentID}}
                ).then(function(dbIssue) {

                    var data = {
                        commentID: commentID,
                        issueID: issueID
                    };
                    io.emit("delete comment", data);

                }).catch(function(err) {
                    if (err) {console.log(err)}
                });
            }).catch(function(err) {
                if (err) {console.log(err)};
            });

        });

    });

}