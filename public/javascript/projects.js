$(document).ready(function() {

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
    })
// END of jQuery
})