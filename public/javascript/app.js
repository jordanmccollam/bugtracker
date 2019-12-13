$(document).ready(function () {

    // CLICK EVENTS ************************************************************

    // ADD PROJECT MODAL
    $("#add-project").on("click", function () {
        event.preventDefault();
        $("#add-project-modal").modal("show");
    });

    // ADD ISSUE MODAL
    $("#add-issue").on("click", function () {
        event.preventDefault();
        $("#add-issue-modal").modal("show");
    });

    // MANAGE PROJECT MODAL
    $(".manage-project").on("click", function() {
        event.preventDefault();
        $("#manage-project-modal").modal("show");
    })

    // DELETE *****************************************************************

    // DELETE PROJECT
    $(".delete-project").on("click", function () {
        event.preventDefault();
        var id = $(this).attr("data-id");
        // var users = [];

        var redirect = window.location.href = "/dashboard";

        $.ajax({
            url: "/delete/" + id,
            type: "DELETE",
            // data: 
        }).then(redirect);
    });

    // DELETE ISSUE
    $(".delete-issue").on("click", function () {
        event.preventDefault();
        var issueID = $(this).attr("data-id");
        var projectID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        var redirect = window.location.reload();

        $.ajax({
            url: "/delete/" + projectID + "/" + issueID,
            type: "DELETE",
        }).then(redirect);
    });

    // UPDATE *****************************************************************

    // UPDATES ISSUE CATEGORY
    $(".issue-category").on("click", function () {
        var category = $(this).attr("category");
        var id = $(this).attr("data-id");
        var redirect = window.location.reload();

        $.ajax({
            url: "/update/" + id,
            type: "PUT",
            data: {
                category: category
            }
        }).then(redirect);
    });

    // ADDS USER TO PROJECT
    $(".add-user").on("click", function() {
        event.preventDefault();
        var redirect = window.location.reload();
        var projectID = $(this).attr("data-id");
        var username = $("#add-user-username").val();

        $.ajax({
            url: "/adduser/" + username + "/" + projectID,
            type: "PUT"
        }).then(redirect);
    });

    // FUNCTIONALITY **********************************************************

    // Finds the issue's category and displays it in the inner issue btn
    $(".findCategory").on("click", function () {
        var category = $(this).attr("active-category");
        $(this).find("." + category).addClass("active");
    });

    // CALLS the CHANGE CATEGORY function which displays the correct issues
    const categoryBar = $("#display-category");
    $(categoryBar).on("click", function () {
        setTimeout(changeCategory, 100);
    })

    // displays the correct issues
    function changeCategory() {
        var displayCategory = $(".display-category.active").find("input").val();
        var issues = $(".btn-issue")
        Array.from(issues).forEach(function (issue) {
            var value = $(issue).attr("active-category");
            $(issue).parent().show();
            if (displayCategory === "all") {
                $(issue).parent().show();
                return;
            }
            if (value !== displayCategory) {
                $(issue).parent().hide();
            }
        })
    }

    // GET JSON REQUEST to POPULATE COMMENTS
    $(".comment").hide();
    $(".btn-issue").on("click", function () {
        $(".comment").hide();
        var id = $(this).attr("data-id");
        $("#comment-" + id).show();

        var comments = [];

        $.getJSON("/comment/" + id, function (data) {
            for (var i = 0; i < data.comments.length; i++) {
                $("#" + data.comments[i]._id).html(data.comments[i].comment);
            }
        });
    });

    // Counts the total issues for dashboard
    countIssues();

    function countIssues() {
        var issuesArr = $(".issues-count").html().split(".");
        var issuesCount = 0
        for (var i = 0; i < issuesArr.length; i++) {
            issuesCount += parseInt(issuesArr[i]);
        }
        $(".issues-count").html(issuesCount);
        $(".issues-count").removeClass("d-none");
    }

    // Counts the total comments for dashboard
    countComments();

    function countComments() {
        var commentsArr = $(".comments-count").html().split(".");
        var commentsCount = 0;
        for (var i = 0; i < commentsArr.length; i++) {
            commentsCount += parseInt(commentsArr[i]);
        }
        $(".comments-count").html(commentsCount);
        $(".comments-count").removeClass("d-none");
    }

    // END of jQuery
})