$(document).ready(function () {
    // Make the helper arrow bob up and down
    var helper = $(".helper");

    function floatAnimation() {
        helper.animate({
            top: "+=20"
        }, 1000);
        helper.animate({
            top: "-=20"
        }, 1000, floatAnimation);
    };

    floatAnimation();

    var tab = $(".nav-tab");
    var count = 0;

    $(tab).mouseover(function () {
        var shaker = $(this).find(".shaker");
        shakeAnimation(shaker, this);

        // if ($(this).hasClass("active") === false) {
        //     $(this).animate({marginBottom: "-=4px"}, 200);
        // }
    });

    // $(tab).mouseout(function() {
    //     if ($(this).hasClass("active") === false) {
    //         $(this).animate({marginBottom: "+=4px"}, 200);
    //     }
        
    // })

    function shakeAnimation(shaker, hoveredTab) {
        if (count < 2) {
            $(shaker).animate({
                left: "+=4"
            }, 200);
            $(shaker).animate({
                left: "-=4"
            }, 200);

            count++;
            shakeAnimation(shaker, hoveredTab);
        } else {
            count = 0;
        }
    }


    // END of jQuery
});