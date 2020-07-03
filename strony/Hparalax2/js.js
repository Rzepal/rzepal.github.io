$(document).ready(function() {
    var szerokosc = $(window).width();

    function paralax() {
        $('.outer-wrapper').scroll(function() {
            var Scroll = $(this).scrollTop();
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
    var scrolling = false;
    $('.outer-wrapper').css('overflow', 'hidden');
    $('.outer-wrapper').bind('mousewheel DOMMouseScroll', function(e) {
        if (!scrolling) {
            scrolling = true;
            e.preventDefault();
            e.stopPropagation();
            var scrolll = $(this).scrollTop();
            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {

                $(this).stop().animate({ scrollTop: scrolll - szerokosc }, 1000, 'swing');
            } else {
                $(this).stop().animate({ scrollTop: scrolll + szerokosc }, 1000, 'swing');
            }
            setTimeout(function() {
                scrolling = false;
            }, 1000);
        }
    });


});