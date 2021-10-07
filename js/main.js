// Load jQuery
import $ from 'jquery';
window.$ = window.jQuery = $;

// Load BS
require('bootstrap');

//Load Libraries
// require('objectFitPolyfill/dist/objectFitPolyfill.min');
// require('select2/dist/js/select2.full.min');
require('slick-slider/slick/slick.min');

// other stufff
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

$(function() {

    // set document to be at top on load
    window.scrollTo(0, 0);

    // toggle menu
    $('.toggleMenu').on("click",function() {
        $(this).toggleClass('__active');
        $('body').toggleClass('__mobile');
    });

    // timeline demo
    // var headerHeight = window.innerHeight;
    // const tl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: ".headerScrollTrigger",
    //         start: "top",
    //         end: "bottom",
    //         scrub: true,
    //         markers: true
    //     }
    // });
    // tl.to(".headerLogoAnimate", {height: 70, duration: 1});
    // tl.to(".mainBodyAnimate", {opacity: 1, duration: 1});

    // scroll breakpoints
    // get window height
    var windowHeight = window.innerHeight;
    var scrub = 0;

    // do scroll stuffffff
    if (window.innerWidth > 992) {
        var offcanvasHeight = $('.offcanvasMenu').outerHeight();
        headerScrollStuff(windowHeight, 70, offcanvasHeight, scrub, '.offcanvasMenu', false);
    } else {
        headerScrollStuff(windowHeight, 35, 60, scrub, '.toggleMenu', true);
    }

    sliders();

    heroScroll(offcanvasHeight);
});



function headerScrollStuff(end, headerLogoHeight, headerSize, scrub, menuElToHide, mobileBoolean) {
    gsap.to('.headerSize', {
        scrollTrigger: {
            trigger: ".mainBodyAnimate",
            start: "top",
            end: end,
            scrub: scrub,
        },
        height: headerSize,
        duration: 1,
    });
    gsap.to('.mainBodyAnimate', {
        scrollTrigger: {
            trigger: ".mainBodyAnimate",
            start: end/3,
            end: end * 1.3,
            scrub: scrub,
        },
        opacity: 1,
        duration: 1
    });
    if (mobileBoolean) {
        gsap.to('.headerLogoAnimate', {
            scrollTrigger: {
                trigger: ".mainBodyAnimate",
                start: "top",
                end: end,
                scrub: scrub,
            },
            height: headerLogoHeight,
            duration: 1
        });
        gsap.to(menuElToHide, {
            scrollTrigger: {
                trigger: ".mainBodyAnimate",
                start: end,
                end: end,
                scrub: scrub,
            },
            duration: 1,
            className:"header-burger d-lg-none toggleMenu ml-auto __show"
        });
    } else {
        var logoSpaceFromBottom = (headerSize - headerLogoHeight) / 2;
        gsap.to('.headerLogoAnimate', {
            scrollTrigger: {
                trigger: ".mainBodyAnimate",
                start: "top",
                end: end,
                scrub: scrub,
            },
            height: headerLogoHeight,
            bottom: logoSpaceFromBottom,
            duration: 1
        });
        gsap.to(menuElToHide, {
            scrollTrigger: {
                trigger: ".mainBodyAnimate",
                start: "top",
                end: end,
                scrub: scrub,
            },
            duration: 1,
            opacity: 1,
        });
    }
}

function heroScroll(offcanvasHeight) {
    if (window.innerWidth > 992) {
        var start = `-=${offcanvasHeight}`;
        var offset = `+=${window.innerWidth * 0.2}`;
    } else {
        var start = "-=70";
        var offset = `+=${window.innerWidth * 0.8}`;
    }
    gsap.to('.heroScrollMove', {
        scrollTrigger: {
            trigger: ".heroScroll",
            start: start,
            pin: true,
            end: offset,
            scrub: true,
        },
        duration: 1
    });
}

function sliders() {
    var imgSlider = $(".imgSlider");
    var textSlider = $(".textSlider");
    var sliderPrev = $('.sliderPrev');
    var sliderNext = $('.sliderNext');
    imgSlider.slick({
        fade: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: sliderPrev,
        nextArrow: sliderNext,
        mobileFirst: true,
        asNavFor: textSlider
    });
    textSlider.slick({
        fade: true,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        variableHeight: true,
    });

    mouseFollow(sliderNext, sliderPrev);

    accordions();
}

function mouseFollow(sliderNext, sliderPrev) {
    var sliderPrev = sliderPrev;
    var sliderNext = sliderNext;
    var mouseFollowEl = $('.mouseFollow');
    var mousefollowBreakpoint = 1025;
    if (window.innerWidth < mousefollowBreakpoint) {
        return;
    }
    $(sliderPrev).on('mousemove',function(e) {
        mouseFollowEl.text('Prev');
        var sliderRect = e.target.parentElement.getBoundingClientRect();
        var x = e.clientX - sliderRect.left;
        var y = e.clientY - sliderRect.top;
        mouseFollowEl.css({
            top: y,
            left: x,
            opacity: "1"
        });
    });
    $(sliderPrev)
        .on('mouseleave',function() {
            mouseFollowEl.css({
                opacity: "0"
            });
        })
        .on('mouseenter',function() {
            mouseFollowEl.css({
                opacity: "1"
            });
        });
    $(sliderNext).on('mousemove',function(e) {
        mouseFollowEl.text('Next');
        var sliderRect = e.target.parentElement.getBoundingClientRect();
        var x = e.clientX - sliderRect.left;
        var y = e.clientY - sliderRect.top;
        mouseFollowEl.css({
            top: y,
            left: x,
            opacity: "1"
        });
    });
    $(sliderNext)
        .on('mouseleave',function() {
            mouseFollowEl.css({
                opacity: "0"
            });
        })
        .on('mouseenter',function() {
            mouseFollowEl.css({
                opacity: "1"
            });
        });
    // hiding mousefollow on scroll
    $(window).on('scroll', function() {
        mouseFollowEl.css({
            opacity: "0"
        });
    });
}

function accordions() {
    $('.textSliderSlides').each(function(i, accordion) {
        var accordionTrigger = '.sliderTextExpandTrigger';
        var accordionContent = '.sliderTextExpandContent';
        var findAccordionTrigger = $(this).find(accordionTrigger);
        var findAccordionContent = $(this).find(accordionContent);

        if (findAccordionTrigger.hasClass('__active')) {
            findAccordionTrigger.attr('aria-expanded', true);
            findAccordionContent.show();
            findAccordionContent.attr('aria-hidden', false);
        } else {
            findAccordionTrigger.attr('aria-expanded', false);
            findAccordionContent.hide();
            findAccordionContent.attr('aria-hidden', true);
        }

        findAccordionTrigger.on('click',function(e) {
            e.preventDefault();
            if ($(this).hasClass('__active')) {
                $(this).attr('aria-expanded', false);
                $(this).removeClass('__active');
                findAccordionContent.slideUp();
                findAccordionContent.attr('aria-hidden', true);
                $(findAccordionTrigger).text('Read more');
            } else {
                $(this).attr('aria-expanded', true);
                $(this).addClass('__active');
                findAccordionContent.slideDown();
                findAccordionContent.attr('aria-hidden', false);
                $(findAccordionTrigger).text('Hide Text');
            }
        });
    });
}