'use strict';
$(function () {
    let bLazy = new Blazy();

    /**
     * Sliders
     */


    // fix slider type product for fancybox
    let slideInit = false;

    $.fancybox.defaults.afterLoad = function () {
        $('.modal').removeClass('animate__animated animate__fadeOutUp');
        $('.modal').addClass('animate__animated animate__fadeInDown');

        if (slideInit == false) {
            // slider type product
            $('.modal .prodslider-big').slick({
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
            $('.modal .prodslider-small').slick({
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
        }

        $('.fancybox-image').parents('.fancybox-inner').prev().css({
            'background': '#fff',
            'opacity': '1'
        });
    };

    $.fancybox.defaults.afterClose = function () {
        if ($('.fancybox-active').find('.modal').hasClass('quick-view') || !$('body').hasClass('.fancybox-active')) {
            slideInit = false;
        }
    };

    $(document).on('init', '.modal .prodslider-big', function () {
        slideInit = true;
    });

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
        autoplaySpeed: 8000,
        speed: 3000,
        cssEase: 'ease-in-out',
        dots: true,
        arrows: true,
        appendArrows: $('.home-offer__navigation'),
        appendDots: $('.home-offer__dots'),
        nextArrow: '<button type="button" class="slick-next"><svg class="slick-next__icon"><use href="img/icons.svg#align-right"></use></svg></button>',
        prevArrow: '<button type="button" class="slick-prev"><svg class="slick-prev__icon"><use href="img/icons.svg#align-left"></use></svg></button>'
    });

    $('.home-offer__slider-all').text($('.home-offer .slick-dots li').length);
    $('.home-offer__slider-now').text($('.home-slider').slick('slickCurrentSlide') + 1);
    $(document).on('afterChange', '.home-slider', function (e, slick) {
        $('.home-offer__slider-now').text($('.home-slider').slick('slickCurrentSlide') + 1);
    });

    // similar slider
    $('.similar-slider__slider').slick({
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        speed: 3000,
        cssEase: 'ease-in-out',
        dots: false,
        arrows: true,
        appendArrows: $('.similar-slider__navigation'),
        appendDots: $('.similar-slider__dots'),
        nextArrow: '<button type="button" class="similar-slider__align slick-next"><svg class="slick-next__icon"><use href="img/icons.svg#align-right"></use></svg></button>',
        prevArrow: '<button type="button" class="similar-slider__align slick-prev"><svg class="slick-prev__icon"><use href="img/icons.svg#align-left"></use></svg></button>',
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
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    $(document).on('afterChange init', '.similar-slider__slider', function (e, slick) {
        $('.similar-slider .slick-slide').css('minHeight', $('.similar-slider .slick-track').height());
    });

    // md size
    if ($(window).width() > 1199) {
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

    $('.bucket-box__bar-line').css('width', $('.bucket-box__bar-line').data('width') + '%' );

    $('.modal-catalog').css('height', $('body').height() - $('.header').height() - 5 + 'px');
    $('.modal-catalog').css('top', $('.header').height() + 3 + 'px');

    // mobile accordion start
    function accordion() {
        $('.accordion').each(function () {
            const index = $(this);
            if ($(window).width() < 768) {
                setAccordion(index);
            } else {
                unsetAccordion(index);
            }

            if (index.hasClass('accordion--set')) {
                index.find('.accordion__btn').unbind('click');
                index.find('.accordion__btn').bind('click', function (e) {
                    e.preventDefault();
                    let btn = $(this);
                    let accrodion = btn.parents('.accordion');
                    let btns = accrodion.find('.accordion__btn');
                    let windows = accrodion.find('.accordion__wrapper');

                    btns.each(function (index) {

                        if ($(btns[index]).data('id') === btn.data('id')) {

                            if ($(this).hasClass('accordion__btn--active')) {

                                $(this).removeClass('accordion__btn--active');

                                $(windows[index]).removeClass('accordion__wrapper--active');
                                $(windows[index]).slideUp();

                            } else {
                                accrodion.find('.accordion__btn--active').removeClass('accordion__btn--active');
                                accrodion.find('.accordion__wrapper--active').slideUp();
                                accrodion.find('.accordion__wrapper--active').removeClass('accordion__wrapper--active');

                                $(this).addClass('accordion__btn--active');

                                $(windows[index]).addClass('accordion__wrapper--active');
                                $(windows[index]).slideDown();
                            }
                        }
                    });
                });
            }
        });
    }

    function setAccordion(accordion) {
        if (!accordion.hasClass('accordion--set')) {
            accordion.find('.accordion__wrapper').slideUp();
            accordion.addClass('accordion--set');
            accordion.removeClass('accordion--unset');

            accordion.find('.accordion__btn').each((index) => {
                $(accordion.find('.accordion__btn')[index]).attr('data-id', index);
            });
        }
    }

    function unsetAccordion(accordion) {
        if (!accordion.hasClass('accordion--unset')) {
            accordion.find('.accordion__wrapper').slideDown();
            accordion.find('.accordion__wrapper').removeClass('accordion__wrapper--active');
            accordion.find('.accordion__btn').removeClass('accordion__btn--active');
            accordion.removeClass('accordion--set');
            accordion.addClass('accordion--unset');
        }
    }// mobile accordion end

    $(window).resize(function () {
        
        $('.similar-slider .slick-slide').css('minHeight', '');

        // md size
        if ($(window).width() > 1199) {
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

        $('.modal-catalog').css('height', $('body').height() - $('.header').height() + 'px');
        $('.modal-catalog').css('top', $('.header').height() + 'px');

        // enumeration of all tabs
        $('.tabs').each(function () {
            let
                tabButtons = $(this).find('.tabs__button'),
                tabWindows = $(this).find('.tabs__window'),
                breakpoint = 1199

            // Start for desktop and mobile
            if (!tabWindows.hasClass('tabs__window--active') && $(window).width() > breakpoint) {
                $(tabButtons[0]).addClass('tabs__button--active');
                $(tabWindows[0]).addClass('tabs__window--active');
                tabWindows.css('display', '');
            }
        });

        accordion();
    }); // resize
    accordion();

    let scrollHeightHeader = 0;
    scrollHeightHeader = $('.header').height() - $(window).scrollTop();
    if (scrollHeightHeader < 0) {
        scrollHeightHeader = 0;
    }
    $('.mobile-block').css({
        'maxHeight': 'calc(100vh - (' + scrollHeightHeader + 'px' + ' + 84px))'
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
        $('.mobile-block').css({
            'maxHeight': 'calc(100vh - (' + scrollHeightHeader+'px'+' + 84px))'
        });

        if ($('.menu-sticky').position().top === $(window).scrollTop()) {
            $('.menu-sticky__menu-top').addClass('menu-sticky__menu-top--active');
        } else {
            $('.menu-sticky__menu-top').removeClass('menu-sticky__menu-top--active');
        }
        bucket();
    }); // scroll

    
    bucket();
    function bucket() {
        if ($(window).width() > 1200 && $('section').hasClass('bucket')) {
            let difPosBuck = Math.floor( $('.bucket-delivery').offset().top - $('.bucket__price').offset().top );
            if (difPosBuck < 167) {
                let difPos = 167 - difPosBuck;
                $('.bucket__price').css('top', parseInt($('.bucket__price').css('top')) - difPos + 'px');
            } else {
                let difPos = difPosBuck - 167;
                $('.bucket__price').css('top', parseInt($('.bucket__price').css('top')) + difPos + 'px');
            }
        }
    }


    $('body').on('click', '.btn-catalog', function (e) {
        e.preventDefault();
        $(document).mouseup(function (e) { // событие клика по веб-документу
            var div = $('.menu-sticky '); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам

                $('.btn-catalog').removeClass('btn-catalog--active');
                $('.catalog-menu').slideUp("fast");
                $('.modal-catalog').removeClass('modal-catalog--active');
                $('body').removeClass('active');

            }
        });
        $(this).toggleClass('btn-catalog--active');
        $('.catalog-menu').slideToggle("fast");
        $('.modal-catalog').toggleClass('modal-catalog--active');
        $('body').toggleClass('active');
    });

    $('body').on('click', '.catalog-menu__close', function (e) {
        e.preventDefault();
        $('.btn-catalog').toggleClass('btn-catalog--active');
        $('.catalog-menu').slideToggle("fast");
        $('.modal-catalog').removeClass('modal-catalog--active');
        $('body').removeClass('active');
    });

    $('body').on('mouseover', '.menu-sticky .header-categories a', function (e) {
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
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });

    $('body').on('click', '.hamb', function (e) {
        $('body').toggleClass('menu-active');
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
            $('body').toggleClass('active');
        }
    });

    $(document).on('click', '.mobile-block--active', function(e) {
        $(this).removeClass('mobile-block--active');
        $('.mobile-link').removeClass('mobile-link--active');
        $('body').removeClass('active');
    });
    
    $(document).on('click', '.mobile-block--active > div', function(e) {
        e.stopPropagation();
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
            breakpoint = 1199,
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
                    tabButtons.each(function(index) {
                        if (index != btnNum && 
                            $(tabButtons[index]).hasClass('tabs__button--active')) {
                                
                            $(tabButtons[index]).removeClass('tabs__button--active');
                            $(tabWindows[index]).removeClass('tabs__window--active');

                            $(tabWindows[index]).slideUp({
                                duration: speed,
                                start: function () {
                                    $(this).css({
                                        display: 'block'
                                    })
                                }
                            });
                        }
                    });

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

    $.fancybox.defaults.beforeShow = function () {
        $('.modal').removeClass('animate__animated animate__fadeOutUp');
        $('.modal').addClass('animate__animated animate__fadeInDown');
    };
    
    $.fancybox.defaults.beforeClose = function () {

        if (!$('.fancybox-slide').hasClass('fancybox-slide--image')) {
            $('.fancybox-is-open .modal').each(function(index) {
                if (index === $('.fancybox-is-open .modal').length - 1) {
                    $(this).removeClass('animate__animated animate__fadeInDown');
                    $(this).addClass('animate__animated animate__fadeOutUp');
                }
            });
        }
    };

    $('body').on('click', '.modal__close', function (e) {
        e.preventDefault();

        $('.fancybox-is-open .modal').each(function(index) {
            if (index === $('.fancybox-is-open .modal').length - 1) {
                $(this).removeClass('animate__animated animate__fadeInDown');
                $(this).addClass('animate__animated animate__fadeOutUp');
            }
        });

        $(document).bind('transitionend webkitTransitionEnd oTransitionEnd', '.fancybox-is-open .modal', function (e) {
            $.fancybox.close();
            $(this).unbind('transitionend webkitTransitionEnd oTransitionEnd', arguments.callee);
        });
    });
});