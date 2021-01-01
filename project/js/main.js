'use strict';
$(function () {
    let bLazy = new Blazy();

    // md size
    if ($(window).width() > 992) {
        $('.full-right').css({
            'marginRight': - ($('.wrapper').width() - $('.container').width()) / 2
        });

        $('.full-left').css({
            'marginLeft': - ($('.wrapper').width() - $('.container').width()) / 2
        });
    }
 
    $(window).resize(function () { 
        // md size
        if ($(window).width() > 992) {
            $('.full-right').css({
                'marginRight': - ($('.wrapper').width() - $('.container').width()) / 2
            });

            $('.full-left').css({
                'marginLeft': - ($('.wrapper').width() - $('.container').width()) / 2
            });
        }
    });

    $('body').on('click', '.btn-catalog', function (e) {
        e.preventDefault();
        $(document).mouseup(function (e) { // событие клика по веб-документу
            var div = $('.menu-sticky '); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам

                $('.btn-catalog').removeClass('btn-catalog--active');
                $('.catalog-menu').slideUp("fast");
            }
        });
        $(this).toggleClass('btn-catalog--active');
        $('.catalog-menu').slideToggle("fast");
    });

    $('body').on('click', '.catalog-menu__close', function (e) {
        e.preventDefault();
        $('.btn-catalog').toggleClass('btn-catalog--active');
        $('.catalog-menu').slideToggle("fast");
    });

    $('body').on('click', '.header-categories a', function (e) {
        e.preventDefault();
        $('.header-categories a').parent().removeClass('active');
        $('.catalog-content__rubrics').removeClass('catalog-content__rubrics--active');
        $($(this).attr('href')).addClass('catalog-content__rubrics--active');
        $(this).parent().addClass('active');
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

    $('body').on('click', '.hamb', function (e) {
        $('body').toggleClass('menu-active');
    });

    $('.home-slider').slick({
        lazyLoad: 'ondemand',
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        arrows: true,
        appendArrows: $('.home-offer__navigation'),
        appendDots: $('.home-offer__dots'),
        nextArrow: '<button type="button" class="slick-next"><svg class="slick-next__icon"><use href="img/icons.svg#align-right"></use></svg></button>',
        prevArrow: '<button type="button" class="slick-prev"><svg class="slick-prev__icon"><use href="img/icons.svg#align-left"></use></svg></button>'
    });

    $('.home-offer__slider-all').text($('.home-offer .slick-dots li').length);
    $('.home-offer__slider-now').text($('.home-slider').slick('slickCurrentSlide') + 1);
    $('.home-slider').on('afterChange', function(e, slick) {
        $('.home-offer__slider-now').text($('.home-slider').slick('slickCurrentSlide') + 1);
        if ( $('.home-offer .slick-current .home-slider__item').data('src') != undefined ) {
            $('.home-offer .slick-current .home-slider__item').css({
                'backgroundImage': 'url(' + $('.home-offer .slick-current .home-slider__item').data('src') + ')'
            });
            $('.home-offer .slick-current .home-slider__item').removeAttr('data-src');
        }
    });

    $('body').on('click', '.modal__close', function(e) {
        e.preventDefault();
        $.fancybox.close();
    });
})