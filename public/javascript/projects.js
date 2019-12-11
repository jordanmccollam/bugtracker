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
            url: "/delete/" + id,
            type: "DELETE",
        }).then(redirect);
    });

    $(".delete-issue").on("click", function() {
        event.preventDefault();
        var issueID = $(this).attr("data-id");
        var projectID =  window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        var redirect = window.location.reload();

        $.ajax({
            url: "/delete/" + projectID + "/" + issueID,
            type: "DELETE",
        }).then(redirect);
    });

    $(".issue-category").on("click", function() {
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

    // Category displays
    // $(".display-category").on("click", function() {
    //     var displayCategory = $(".display-category.active").find("input").val();
    //     console.log(displayCategory);
    // })

    const categoryBar = $("#display-category");
    $(categoryBar).on("click", function() {
        setTimeout(changeCategory, 100);
    })

    function changeCategory() {
        var displayCategory = $(".display-category.active").find("input").val();
        var issues = $(".btn-issue")
        Array.from(issues).forEach(function(issue) {
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



// END of jQuery
})