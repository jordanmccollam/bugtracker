$(document).ready(function() {

    // CLICK EVENTS
    $("#add-project").on("click", function() {
        event.preventDefault();
        $("#add-project-modal").modal("show");
    });
    $("#add-issue").on("click", function() {
        event.preventDefault();
        $("#add-issue-modal").modal("show");
    });

    $(".findCategory").on("click", function() {
        var category = $(this).attr("active-category");
        $(this).find("." + category).addClass("active");
    });

    $(".delete-project").on("click", function() {
        event.preventDefault();
        var id = $(this).attr("data-id");

        var redirect = window.location.href = "/projects";

        $.ajax({
            url: "/deleteproject/" + id,
            type: "DELETE",
        }).then(redirect);
    });

    $(".delete-issue").on("click", function() {
        event.preventDefault();
        var id = $(this).attr("data-id");

        var redirect = window.location.reload();

        $.ajax({
            url: "/deleteissue/" + id,
            type: "DELETE",
        }).then(redirect);
    });

// END of jQuery
})