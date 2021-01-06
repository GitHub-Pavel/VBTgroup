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

        $('.link-bucket__quantity').each(function () {
            $(this).height($(this).width());
        });

        if ($(window).width() >= 1200) {
            $('.filter').slideDown();
        } else {

            // close quick-view for mobile
            if ($('body').hasClass('fancybox-active') && $('.fancybox-container .modal').hasClass('quick-view')) {
                $.fancybox.close();
            }

        }
    }); // resize

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

        if ($('.menu-sticky').position().top === $(window).scrollTop()) {
            $('.menu-sticky__menu-top').addClass('menu-sticky__menu-top--active');
        } else {
            $('.menu-sticky__menu-top').removeClass('menu-sticky__menu-top--active');
        }
    }); // scroll

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

    $('body').on('click', '.btn-up', function (e) {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    $('body').on('click', '.hamb', function (e) {
        $('body').toggleClass('menu-active');
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

    $('body').on('DOMSubtreeModified', '.link-bucket__text', function () {
        $(this).parent().height($(this).parent().width());
    });

    $('.link-bucket__quantity').each(function() {
        $(this).height($(this).width());
    });
    
    $('body').on('click', '.btn-open', function(e) {
        e.preventDefault();
        $(this).toggleClass('btn-open--active');
        $(this).next().slideToggle();
    });
    
    $('.btn-open').each(function(e) {
        if ($(this).hasClass('filter__btn-wrapper--active')) {
            $(this).next().slideToggle();
            $(this).toggleClass('btn-open--active');
        }
    });
    
    $('body').on('click', '.filter-btn', function(e) {
        e.preventDefault();
        if ($(window).width() <= 1200) {
            $(this).toggleClass('filter-btn--active');
            $('.filter').slideToggle({
                start: function () {
                    $(this).css({
                        display: "flex"
                    })
                }
            });
            $('.filter').toggleClass('filter--active');
        }
    });
    
    $('body').on('click', '.sort-view__radio', function(e) {
        let input = $(this).find('.sort-view__input');

        $('.sort-view__input').each(function () {
            $('.products').removeClass('products--' + $(this).val());
        })

        if (input.val() !== 'default') {
            $('.products').addClass('products--' + input.val());
        }
    });

    $('body').on('mouseover', '.catalog-item__content a', function (e) {
        $(this).parents('.catalog-item').find('.catalog-item__title').addClass('catalog-item__title--active');
    });

    $('body').on('mouseout', '.catalog-item__content a', function (e) {
        $(this).parents('.catalog-item').find('.catalog-item__title').removeClass('catalog-item__title--active');
    });

    $('body').on('mouseover', '.home-banner, .banner-menu, .site-banner', function (e) {
        $(this).find('.btn').addClass('btn--hover');
    });

    $('body').on('mouseout', '.home-banner, .banner-menu, .site-banner', function (e) {
        $(this).find('.btn').removeClass('btn--hover');
    });

    // plus-minus
    $('body').on('click', '.plus-minus__button', function (e) {
        // prevent default
        e.preventDefault();

        let input = $(this).parent().find('.plus-minus__field');
        let buttonMinus = $(this).parent().find('.plus-minus__button--minus');
        let buttonPlus = $(this).parent().find('.plus-minus__button--plus');
        let val = +input.val();

        // input.value = button + plus(minus)
        if ($(this).hasClass('plus-minus__button--minus') && !$(this).hasClass('plus-minus__button--inactive')) {
            // plus-minus var
            val--;

            // plus-minus input
            input.val(val);
        } else if ($(this).hasClass('plus-minus__button--plus') && !$(this).hasClass('plus-minus__button--inactive')) {
            // plus-minus var
            val++;

            // plus-minus input
            input.val(val);
        }

        // limitation conditions for button minus
        if (val === 1) {
            buttonMinus.addClass('plus-minus__button--inactive');
        } else {
            buttonMinus.removeClass('plus-minus__button--inactive');
        }
    });

    // for input type text but the number behavior scenario
    $('body').on('change keyup input click', '.input-number', function (e) {
        // replace all symbols and letters other than minus
        if (this.value.match(/[^0-9--]/g)) {
            this.value = this.value.replace(/[^0-9--]/g, '');
        };
    });
    
    // limitation conditions for input
    $('body').on('blur', '.plus-minus__field', function (e) {
        if (this.value > 1) {
            $(this).parent().find('.plus-minus__button--minus').removeClass('plus-minus__button--inactive');
        } else {
            this.value = 1;
            $(this).parent().find('.plus-minus__button--minus').addClass('plus-minus__button--inactive');
        }
    }); // plus-minus

    // enumeration of all tabs
    $('.tabs').each(function() {
        let 
            tabButtons = $(this).find('.tabs__button'),
            tabWindows = $(this).find('.tabs__window'),
            breakpoint = 1200,
            speed = 400;
        
        // Start for desktop and mobile
        if ($(window).width() > breakpoint) {
            $(tabButtons[0]).addClass('tabs__button--active');
            $(tabWindows[0]).addClass('tabs__window--active');
        } else {
            tabWindows.css({
                display: 'none'
            });
        }

        // initialization of the pressed button
        tabButtons.each(function (value) {
            // nubmer of the pressed button
            let btnNum = value;

            // click
            $(this).on('click', function (e) {
                // prevent default
                e.preventDefault();

                // mobile or desktop
                if ($(window).width() > breakpoint) {

                    // desktop
                    
                    // from mobile to desktop
                    tabWindows.css('display', '');

                    tabButtons.removeClass('tabs__button--active');
                    tabWindows.removeClass('tabs__window--active');
                    $(tabButtons[btnNum]).addClass('tabs__button--active');
                    $(tabWindows[btnNum]).addClass('tabs__window--active');

                } else {
                    
                    // from desktop to mobile
                    tabWindows.each(function () {
                        if ( $(this).hasClass('tabs__window--active') ) {
                            $(this).css('display', 'block');
                        } else {
                            $(this).css('display', 'none');
                        }
                    });

                    // mobile
                    $(tabButtons[btnNum]).toggleClass('tabs__button--active');
                    $(tabWindows[btnNum]).toggleClass('tabs__window--active');

                    // open and close
                    $(tabWindows[btnNum]).slideToggle({
                        duration: speed,
                        start: function () {
                            $(this).css({
                                display: 'block'
                            })
                        }
                    });
                    
                }
            });
        })
    });

    /**
     * Sliders
     */

    
    // fix slider type product for fancybox
    $.fancybox.defaults.afterShow = function () {
        $('.modal .prodslider-big').slick('setPosition');
        $('.modal .prodslider-small').slick('setPosition');
    };

    // slider type product
    $('.prodslider-big').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        arrows: false,
        infinite: true,
        dots: false,
        fade: true,
        asNavFor: '.prodslider-small',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true
                }
            }
        ]
    });
    $('.prodslider-small').slick({
        lazyLoad: 'ondemand',
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        dots: false,
        infinite: true,
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        focusOnSelect: true,
        asNavFor: '.prodslider-big',
    });

    // home slider
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
    $('.home-slider').on('afterChange', function (e, slick) {
        $('.home-offer__slider-now').text($('.home-slider').slick('slickCurrentSlide') + 1);
    });

    // similar slider
    $('.similar-slider__slider').slick({
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: true,
        appendArrows: $('.similar-slider__navigation'),
        appendDots: $('.similar-slider__dots'),
        nextArrow: '<button type="button" class="similar-slider__align slick-next mt-30"><svg class="slick-next__icon"><use href="img/icons.svg#align-right"></use></svg></button>',
        prevArrow: '<button type="button" class="similar-slider__align slick-prev mt-30"><svg class="slick-prev__icon"><use href="img/icons.svg#align-left"></use></svg></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });
});