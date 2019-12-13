$(document).ready(function() {

    // Variables
    var socket = io();

    // Socket Listeners ************************************************
    // New comment
    socket.on("new comment", function(data) {
        var newComment = $(`
            <div class="row" id="comment-to-delete-${data.comment._id}">
                <div class="col-10">
                    <span class="text-purple font-italic">${data.username}: </span>
                    <span id="${data.comment._id}"> ${data.comment.comment}</span>
                </div>
                <div class="col-2">
                    <button class="btn-subtle text-danger delete-comment" comment-id="${data.comment._id}" issue-id="${data.issueID}">X</button>
                </div>
            </div>
        `);

        $("#no-comments-yet-" + data.issueID).hide();
        $(".new-comment-comment").val("");
        $("#comment-section-" + data.issueID).append(newComment);
    });

    // Delete comment
    socket.on("delete comment", function(data) {
        $("#comment-to-delete-" + data.commentID).remove();
    });

    // Socket Emits *******************************************************
    // New comment
    $(".new-comment-form").submit(function() {
        event.preventDefault();
        var comment = $(this).find(".new-comment-comment").val();
        var issueID = $(this).attr("for-issue");
        var username = $(this).attr("from-user");

        var data = {
            comment: comment,
            issueID: issueID,
            username: username
        };

        socket.emit("new comment", data);
    });

    // Delete comment
    $(".delete-comment").on("click", function() {
        event.preventDefault();
        var commentID = $(this).attr("comment-id");
        var issueID = $(this).attr("issue-id");
        
        var data = {
            commentID: commentID,
            issueID: issueID
        };

        socket.emit("delete comment", data);
    });


// End of jQuery
});