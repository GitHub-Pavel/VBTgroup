'use strict';
$(function () {
    let bLazy = new Blazy();

    // md size
    if ($(window).width() >= 992) {
        $('.full-right').css({
            'marginRight': ($('.wrapper').width() - $('.header .container').width()) / 2 * -1
        });

        $('.full-left').css({
            'marginLeft': ($('.wrapper').width() - $('.header .container').width()) / 2 * -1
        });
        $('.menu-sticky').css({
            'top': '0px'
        });
    } else {
        $('.menu-sticky').css({
            'top': $('.header').offset().top + $('.header').height() + 'px'
        });
    } 
    // md size

    $('.catalog-item__content').each(function() {
        $(this).find('a').each(function() {
            if ($(this).parent().next().is('li')) {
                let li = $(this).parent(),
                    liNext = li.next(),
                    liTop = li.offset().top,
                    liNextTop = liNext.offset().top;

                if (liTop != liNextTop) {
                    $(this).addClass('notdot');
                } else {
                    $(this).removeClass('notdot');
                }
            }
        });
    });

    $(window).resize(function () { 
        // md size
        if ($(window).width() >= 992) {
            $('.full-right').css({
                'marginRight': ($('.wrapper').width() - $('.header .container').width()) / 2 * -1
            });

            $('.full-left').css({
                'marginLeft': ($('.wrapper').width() - $('.header .container').width()) / 2 * -1
            });
            $('.menu-sticky').css({
                'top': '0px'
            });
        } else {
            $('.menu-sticky').css({
                'top': $('.header').offset().top + $('.header').height() + 'px'
            });
            $('.full-right').css({
                'marginRight': '0px'
            });

            $('.full-left').css({
                'marginLeft': '0px'
            });
        }

        $('.catalog-item__content').each(function () {
            $(this).find('a').each(function () {
                if ($(this).parent().next().is('li')) {
                    let li = $(this).parent(),
                        liNext = li.next(),
                        liTop = li.offset().top,
                        liNextTop = liNext.offset().top;

                    if (liTop != liNextTop) {
                        $(this).addClass('notdot');
                    } else {
                        $(this).removeClass('notdot');
                    }
                }
            });
        });
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

    $('body').on('click', '.menu-sticky .header-categories a', function (e) {
        e.preventDefault();
        $('.menu-sticky .header-categories a').parent().removeClass('active');
        $('.catalog-content__bottom').removeClass('catalog-content__bottom--active');
        $($(this).attr('href')).addClass('catalog-content__bottom--active');
        $(this).parent().addClass('active');
    });

    $('body').on('click', '.mobile-menu .header-categories a', function (e) {
        if ($(this).parent().parent().hasClass('header-categories')) {
            e.preventDefault();
            if (!$(this).parent().hasClass('active')) {
                $('.mobile-menu .header-categories a').parent().removeClass('active');
                $('.mobile-menu .header-categories .sub-menu').slideUp();
            }
            $(this).parent().toggleClass('active');
            $(this).parent().find('.sub-menu').slideToggle();
        }
    });

    let scrollHeightHeader = 0;
    scrollHeightHeader = $('.header').height() - $(window).scrollTop();
    if (scrollHeightHeader < 0) {
        scrollHeightHeader = 0;
    }
    $('.mobile-menu__header-categories').css({
        'maxHeight': 'calc(100vh - (' + scrollHeightHeader + 'px' + ' + 87px))'
    });

    $(window).scroll(function (e) {
        if ($(window).scrollTop() > 0) {
            $('.btn-up').addClass('btn-up--active');
        } else {
            $('.btn-up').removeClass('btn-up--active');
        }

        scrollHeightHeader = $('.header').height() - $(window).scrollTop();
        if (scrollHeightHeader < 0) {
            scrollHeightHeader = 0;
        }
        $('.mobile-menu__header-categories').css({
            'maxHeight': 'calc(100vh - (' + scrollHeightHeader+'px'+' + 87px))'
        });
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

    $('body').on('click', '.mobile-link', function (e) {
        if ($(this).attr('href')[0] === '#') {
            e.preventDefault();
            if (!$(this).hasClass('mobile-link--active')) {
                $('.mobile-link').removeClass('mobile-link--active');
                $('.mobile-block').removeClass('mobile-block--active');
            }
            $(this).toggleClass('mobile-link--active');
            $($(this).attr('href')).toggleClass('mobile-block--active');
        }
    });
})