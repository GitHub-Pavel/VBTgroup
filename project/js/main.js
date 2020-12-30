'use strict';
$(function () {
    let bLazy = new Blazy();

    $('.full-right').css({
        'marginRight': - ($('.wrapper').width() - $('.container').width()) / 2
    });

    $('.full-left').css({
        'marginLeft': - ($('.wrapper').width() - $('.container').width()) / 2
    });

    $(window).resize(function () {
        $('.full-right').css({
            'marginRight': - ($('.wrapper').width() - $('.container').width()) / 2
        });

        $('.full-left').css({
            'marginLeft': - ($('.wrapper').width() - $('.container').width()) / 2
        });
    });

    $('body').on('click', '.btn-catalog', function (e) {
        e.preventDefault();
        $(this).toggleClass('btn-catalog--active');
        $('.catalog-menu').slideToggle("fast");
    });

    $('body').on('click', '.catalog-menu__close', function (e) {
        e.preventDefault();
        $('.btn-catalog').toggleClass('btn-catalog--active');
        $('.catalog-menu').slideToggle("fast");
    });

    $('body').on('click', '.menu-category--button', function (e) {
        e.preventDefault();
        $('.menu-category--button').removeClass('menu-category--active');
        $('.catalog-content__rubrics').removeClass('catalog-content__rubrics--active');
        $($(this).attr('href')).addClass('catalog-content__rubrics--active');
        $(this).addClass('menu-category--active');
    });

    $(window).scroll(function (e) {
        if ($(window).scrollTop() > 0) {
            $('.btn-up').addClass('btn-up--active');
        } else {
            $('.btn-up').removeClass('btn-up--active');
        }
    });

    $('body').on('click', '.btn-up', function (e) {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
})