$(document).ready(function() {
    var szerokosc = $(window).width();
    var wysokosc = $(window).height();

    $('.a').css('width', szerokosc, 'height', wysokosc);
    $('.b').css('width', szerokosc, 'height', wysokosc);
    $('.c').css('width', szerokosc, 'height', wysokosc);


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
    var slajd = 0;
    $('.outer-wrapper').css('overflow', 'hidden');
    $('.outer-wrapper').bind('mousewheel DOMMouseScroll', function(e) {
        if (!scrolling) {
            scrolling = true;
            e.preventDefault();
            e.stopPropagation();
            var scrolll = $(this).scrollTop();
            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {

                $(this).stop().animate({ scrollTop: scrolll - szerokosc }, 1000, 'swing');
                slajd = slajd - 1;
            } else {
                $(this).stop().animate({ scrollTop: scrolll + szerokosc }, 1000, 'swing');
                slajd = slajd + 1;
            }
            if (slajd > 2) { slajd = 2; }
            if (slajd == 1) {
                $('.cechy').addClass('black');
                $('.cechy').removeClass('white');
            } else {
                $('.cechy').removeClass('black');
                $('.cechy').addClass('white');
            }
            setTimeout(function() {
                scrolling = false;
            }, 1000);
        }
    });
    setTimeout(function() {
        $('.outer-wrapper').scroll(function() {
            let position = $(this).scrollTop();
            if (position >= 0) {
                $('.item').each(function(i) {
                    setTimeout(function() {
                        $('.item').eq(i).addClass('show');
                    }, 300 * (i + 1));
                });
            }
        });
    }, 1600);

});
