// Modals
// sign up modal
$("#signup-button").on("click", function() {
    event.preventDefault();
    $("#signup-modal").modal("show");
});

// login modal
$("#login-button").on("click", function() {
    event.preventDefault();
    $("#login-modal").modal("show");
});