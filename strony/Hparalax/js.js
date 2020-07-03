$(document).ready(function() {
    var szerokosc = $(window).width();

    function paralax() {
        $('.outer-wrapper').scroll(function() {
            var Scroll = $(this).scrollTop();
            console.log(Scroll);
            $('.a').css({
                'transform': 'translateX(' + Scroll / 30 + '%)'
            });
            $('.b').css({
                'transform': 'translateX(' + (-szerokosc + Scroll) / 30 + '%)'
            });
            $('.c').css({
                'transform': 'translateX(' + (-(szerokosc * 2) + Scroll) / 30 + '%)'
            });
            $('.d').css({
                'transform': 'translateX(' + (-(szerokosc * 3) + Scroll) / 30 + '%)'
            });

        });
    }


    if (szerokosc > 992) {
        paralax();
    }

    $(window).on('resize', function() {
        szerokosc = $(window).width();
        if (szerokosc < 992) {
            $(window).off('scroll');
        } else {
            paralax();
        }
    });
});