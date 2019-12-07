
// Listen for auth changes
auth.onAuthStateChanged(user => {
    if (user) {
        $(".userNotAuthenticated").hide();
        $(".userAuthenticated").show();
        $(".blue-tab").addClass("active");
        $("#welcomeMessage").html(user.email);
    } else {
        $(".userAuthenticated").hide();
        $(".userNotAuthenticated").show();
        $(".blue-tab").removeClass("active");
        $("#welcomeMessage").html("");
    }
});


//   Sign up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get user info
    var email = signupForm["signup-email"].value;
    var password = signupForm["signup-password"].value;

    // Sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // Close the dropdown menu
        window.location.reload();
    });

    // TODO save user email to bug tracker database
});

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // get user info
    var email = loginForm["login-email"].value;
    var password = loginForm["login-password"].value;

    // Login user
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // Close the dropdown menu
        window.location.reload();
    });
});

// Logout
const logout = document.querySelector("#logout-button");
logout.addEventListener("click", (event) => {
    event.preventDefault();

    auth.signOut().then(() => {
        console.log("User signed out");
    });
});
