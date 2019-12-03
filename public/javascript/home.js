$(document).ready(function() {

// Make the helper arrow bob up and down
var helper = $(".helper");

function floatAnimation() {
    helper.animate({top: "+=20"}, 1000);
    helper.animate({top: "-=20"}, 1000, floatAnimation);
};

floatAnimation();


// END of jQuery
});