$(document).ready(function () {


    $('.img').addClass('przesuniecie');
    $('.header').addClass('przesuniecie2');
    $('.logo').addClass('pojawianie');
    $('.przy').addClass('pojawianie2');

    $('.nav-button').click(function () {
        $('.nav-button').toggleClass('change');
    });

    $(window).scroll(function () {
        let position = $(this).scrollTop();
        if (position >= 200) {
            $('.nav-menu').addClass('custom-navbar');
        } else {
            $('.nav-menu').removeClass('custom-navbar');
        }
    });


});
