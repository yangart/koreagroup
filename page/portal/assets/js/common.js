/*
    Author  : Somi Park, hyojeong yang
    Date    : 2023-03-01
    Project : KHSA EDU
*/
var ie = /MSIE/.test(navigator.userAgent);
ieVer = ie ? parseInt(navigator.userAgent.split('MSIE')[1].split(';')[0]) : false;

if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

// ------------------------  공통함수 ------------------------
var exTarget;
var a11yFocus = function () { // 접근성 포커싱 관련 공통 함수. 함수 선언 시 exTarget 전역변수로 넣어줘야함.
    function openFocus(_this, _focus, tabIndex) {
        exTarget = $(_this);

        setTimeout(function () {
            if (tabIndex == true) {
                _focus.attr('tabindex', '1').focus();
            } else {
                _focus.focus();
            }
        }, 0)
    }
    function closeFocus(tabIndex) {
        setTimeout(function () {
            if (tabIndex == true) {
                $(exTarget).attr('tabindex', '-1').focus();
            } else {
                $(exTarget).focus();
            }
        }, 0)
    }
    return {
        openFocus: openFocus,
        closeFocus: closeFocus,
    }
}

/**
 * @param opt {
 * obj : 토글 클래스가 붙을 오브젝트,
 * className : 토글시 클래스명,
 * hasClass : 요소가 클래스를 가지고 있을 때 함수를 실행한다,
 * noneClass : 요소가 클래스를 가지고 있지 않을 때 함수를 실행한다,
 * }
 */
var toggleCommonFunc = function (opt) {
    opt.obj = opt.obj;

    $(opt.obj).toggleClass(opt.className);

    if ($(opt.obj).hasClass(opt.className)) {
        opt.hasClass()

    } else {
        opt.noneClass();
    }
}

/**
 *
 * @param opt {
 * pc : function
 * mo : function
 * ta : fucntion
 * }
 */
var ssmFunc = function (opt) {
    var ssmPc = (opt.hasOwnProperty('pc') && opt.pc) ? true : false;
    var ssmTa = (opt.hasOwnProperty('ta') && opt.ta) ? true : false;
    var ssmMo = (opt.hasOwnProperty('mo') && opt.mo) ? true : false;

    if (ssmPc) {
        ssm.addState({
            id: 'pc',
            query: '(min-width: 1280px)',
            onEnter: function () {
                opt.pc();
            },
        });
    }
    if (ssmTa) {
        ssm.addState({
            id: 'ta',
            query: '(min-width: 768px) and (max-width: 1279px)',
            onEnter: function () {
                opt.ta();
            },
        });
    }
    if (ssmMo) {
        ssm.addState({
            id: 'mo',
            query: '(max-width: 767px)',
            onEnter: function () {
                opt.mo();
            },
        });
    }
};

if (jQuery) (function ($) {
    //common
    //$.extend($.fn, {
    //    Func: function () {
    //        var init = function (obj) {

    //        };
    //        $(this).each(function () {
    //            init(this);
    //        });
    //        return $(this);
    //    }
    //});

    //component
    //accordion
    $.extend($.fn, {
        accordionFunc: function () {
            var init = function (obj) {
                var $btn = $(obj).find('li').find('.btn-accordion-toggle');
                $(document).on('click', $btn, function (e) {
                    var $target = $(e.target);
                    if ($target.is($btn)) {
                        $target.closest('li').siblings('li').removeClass('is-active');
                        toggleCommonFunc({
                            obj: $target.closest('li'),
                            className: 'is-active',
                            hasClass: function (obj) {
                                //$(obj).removeClass('is-active');
                                TweenMax.fromTo('.accordion-txt-area', .5, { opacity: 0 }, { opacity: 1 });
                                $btn.html('열기');
                                $target.html('닫기');
                            },
                            noneClass: function (obj) {
                                TweenMax.fromTo('.accordion-txt-area', .5, { opacity: 1 }, { opacity: 0 });
                                $btn.html('열기');
                            }
                        });
                    }
                });
            };
            init(this);
            return $(this);
        }
    });

    //btnarrToggle
    $.extend($.fn, {
        btnarrToggleFunc: function () {
            var init = function (obj) {
                $(obj).on('click', function () {
                    $('.btn-arr-toggle').toggleClass('is-up');
                });
            };
            $(this).each(function () {
                init(this);
            });
            return $(this);
        }
    });

    //inputFocus
    $.extend($.fn, {
        inputFocusFunc: function () {
            var init = function (obj) {
                $input = $(obj).find('.form-input');
                $input.focus(function () {
                    $(this).parents('.form-row').addClass('focused');
                });

                $input.blur(function () {
                    var inputValue = $(this).val();
                    if (inputValue == "") {
                        $(this).prev('.form-label').show();
                        $(this).parents('.form-row').removeClass('focused');
                    } else {
                        $(this).prev('.form-label').hide();
                    }
                });
            };
            $(this).each(function () {
                init(this);
            });
            return $(this);
        }
    });

    //tabs-noraml
    $.extend($.fn, {
        tabsNormalFunc: function () {
            var init = function (obj) {
                var $currentTab = $(obj).find("[class^='tabs-nav']").find('a.is-active').attr('href');
                $($currentTab).show();

                $(obj).find("[class^='tabs-nav']").find('a').on('click', function () {
                    //var $li = $(this).parent('li');
                    if ($(this).hasClass("is-active") == false) {
                        $(obj).find("[class^='tabs-nav']").find('a').removeClass("is-active").removeAttr('title');
                        $(this).addClass("is-active").attr('title', '탭선택됨'); //접근성 추가
                    }
                    $(obj).find('.tabs-cont').hide();
                    var $activeTab = $(this).attr('href');
                    $($activeTab).show();

                    return false;
                });
            };
            $(this).each(function () {
                init(this);
            });
            return $(this);
        }
    });

    // schLgFunc
    $.extend($.fn, {
        schLgFunc: function () {
            var init = function (obj) {
                //검색 열기
                $(document).on('focus', '.shc-lg-autocomplete', function () {
                    $(obj).addClass('is-active');
                    var tl = new TimelineMax();
                    tl.fromTo('.sch-layer', .4, { opacity: .5 }, { opacity: 1 }).fromTo('.sch-layer-cont > div', .4, { opacity: 0, x: 20 }, { opacity: 1, x: 0 });
                    ssmFunc({
                        mo: function () {
                            $('body').css({ 'overflow-y': 'hidden' });
                        }
                    });
                });

                //검색 닫기
                var schClose = function () {
                    $(obj).removeClass('is-active');
                    $('body').css({ 'overflow-y': 'auto' });
                }

                //접근성 포터스 추가
                var schObj = $(obj).find('.sch-layer-area'),
                    schObjTabbable = schObj.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])"),
                    // schObjTabbableFirst = schObjTabbable && schObjTabbable.first();
                    schObjTabbableLast = schObjTabbable.last();

                // tab 검색 닫기
                //schObjTabbableLast.on("keydown", function (event) {
                //     if (!event.shiftKey && (event.keyCode || event.which) === 9) {
                //         schClose();
                //     }
                // });
                $(document).on("keydown", function (event) {
                    var schObjTabbable = schObj.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])").filter(':visible');
                    var schObjTabbableLast = schObjTabbable.last();

                    if (schObjTabbableLast.length > 0 && !event.shiftKey && (event.keyCode || event.which) === 9) {
                        if ($(event.target).is(schObjTabbableLast)) {
                            schClose();
                        }
                    }
                });

                // shft + tab 검색 닫기
                $(document).on("keydown", '.shc-lg-autocomplete', function (event) {
                    if (event.shiftKey && (event.keyCode || event.which) === 9) {
                        schClose();
                    }
                });

                //검색 이외 창 클릭시 닫기
                $(document).click(function (e) {
                    if (!$(e.target).is('.sch-lg-area, .sch-lg-area *')) {
                        schClose();
                    }
                });

                //검색 닫기
                $(document).on("click", '.btn-sch-lg-close, .sch-lg-area .btn-sch', function (event) {
                    schClose();
                });

                //메인 검색 스크롤이동
                $(".mn-sch .shc-lg-autocomplete").on('click, focus', function () {
                    $('html, body').animate({
                        scrollTop: $(".mn-sch").offset().top
                    }, 500);
                });

            };
            init(this);
            return $(this);
        }
    });

    //sort
    $.extend($.fn, {
        sortFunc: function () {
            var init = function (obj) {
                $(obj).find('.btn-sort').on('click', function () {
                    if ($(this).hasClass("is-active") == false) {
                        $(obj).find('.btn-sort').removeClass("is-active").removeAttr('title');
                        $(this).addClass("is-active").attr('title', '선택됨'); //접근성 추가
                    }
                });
            };
            $(this).each(function () {
                init(this);
            });
            return $(this);
        }
    });

    //common
    //header
    $.extend($.fn, {
        headerFunc: function () {
            var init = function (obj) {
                var headerH = $('.site-header').height();
                var tl = new TimelineMax();

                //tl.fromTo($('.site-header.is-sticky'), .3, { yPercent: -100, opacity: 0 }, { yPercent: 0, opacity: 1 });
                var controller = new ScrollMagic.Controller();
                var scene = new ScrollMagic.Scene({
                    offset: 1
                }).setClassToggle('.site-header', 'is-sticky').addTo(controller);
            };
            init(this);
            return $(this);
        }
    });

    //gnbFunc
    $.extend($.fn, {
        gnbFunc: function () {
            var init = function (obj) {

                var $gnb = $(obj),
                    $dep1 = $gnb.find('>ul>li'),
                    $frist = $gnb.find('>ul>li:first-child>a');
                $last = $gnb.find('>ul>li:last-child>ul>li:last-child a');

                //mouseenter, 
                $dep1.on('mouseenter', function () {
                    $gnb.find('>ul>li').removeClass('is-active');
                    TweenMax.fromTo($(this).find('ul'), .3, { opacity: 0, height: 0 }, { opacity: 1, height: "auto" });
                    $(this).addClass('is-active');
                });

                //mouseleave
                $dep1.on('mouseleave', function () {
                    $(this).removeClass('is-active');
                });

                //focusin
                $dep1.on('focusin', function () {
                    $gnb.find('>ul>li').removeClass('is-active');
                    $(this).addClass('is-active');
                });

                //첫링크 포커스 아웃
                $frist.keyup(function (e) {
                    if (e.shiftKey && e.keyCode == 9) {
                        $gnb.find('>ul>li').removeClass('is-active');
                    }
                });

                //마지막링크 포커스 아웃
                $last.on('keydown', function (e) {
                    if (e.which === 9) {
                        $last.on('focusout', function () {
                            $gnb.find('>ul>li').removeClass('is-active');
                        });
                    }
                });
            };
            init(this);
            return $(this);
        }
    });

    //navFunc
    $.extend($.fn, {
        navFunc: function () {
            var init = function (obj) {
                var $nav = $(obj);
                // ssmFunc({
                //     pc: function () {
                //         $('.btn-nav-open').on('click', function () {
                //             //$nav.addClass('is-active');
                //             $nav.fadeIn();
                //         });

                //         $('.btn-nav-close, .dim').on('click', function () {
                //             //$nav.removeClass('is-active');
                //             $nav.fadeOut();
                //         });
                //     },
                //     ta: function () {
                //         $('.btn-nav-open').on('click', function () {
                //             TweenMax.fromTo($nav, .3, { opacity: 0 }, { opacity: 1 });
                //             $nav.addClass('is-active');
                //             mNavOpen();
                //         });
                //         $('.btn-nav-close, .dim').on('click', function () {
                //             $nav.removeClass('is-active');
                //             mNavClose();
                //         });
                //     },
                //     mo: function () {
                //         $('.btn-nav-open').on('click', function () {
                //             TweenMax.fromTo($nav, .3, { opacity: 0 }, { opacity: 1 });
                //             $nav.addClass('is-active');
                //             mNavOpen();
                //         });
                //         $('.btn-nav-close, .dim').on('click', function () {
                //             $nav.removeClass('is-active');
                //             mNavClose();
                //         });
                //     }
                // });
                $(document).on('click', '.btn-nav-open', function () {
                    $('.site-nav-area').fadeIn();
                });
                $(document).on('click', '.btn-nav-close', function () {
                    $('.site-nav-area').fadeOut();
                });
                var mNavOpen = function () {
                    TweenMax.fromTo($('.site-nav .nav-util, .site-nav > ul'), .4, { opacity: 0 }, { opacity: 1 });
                    $('.btn-nav-close').fadeIn();
                }

                var mNavClose = function () {
                    TweenMax.fromTo($('.site-nav .nav-util, .site-nav > ul'), .4, { opacity: 0 }, { opacity: 1 });
                    $('.btn-nav-close').fadeOut();
                }
            };
            init(this);
            return $(this);
        }
    });

    //별점
    $.extend($.fn, {
        starCheckFunc: function () {
            var init = function () {
                $('.star-check button').on('click', function () {
                    $('.star-check button').removeClass('is-active').attr('title');
                    $(this).addClass('is-active').prevAll().addClass('is-active');
                    TweenMax.fromTo('.star-check .is-active', .5, { scale: 1.4 }, { scale: 1 });
                    $(this).attr('title', '선택됨');
                });
            };
            init(this);
            return $(this);
        }
    });

    //topSwiper
    $.extend($.fn, {
        topSwiper: function () {
            var init = function (obj) {
                var swiper = new Swiper('.top-swiper', {
                    // preloadImages: true,
                    // lazy: {
                    //     loadPrevNext: true
                    // },
                    autoplay: {
                        delay: 4000,
                        // disableOnInteraction: false
                    },
                    loop: true,
                    loopedSlides: 0,
                    speed: 1000,
                    slidesPerView: 1,
                    initialSlide: 0,
                    watchSlidesProgress: true,
                    pagination: {
                        el: ".swiper-pagination",
                        type: "bullets",
                    },
                    navigation: {
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next'
                    },
                    on: {
                        slideChangeTransitionStart: function (sw) {
                            var num = $(obj).find('.swiper-pagination-num');
                            num.html('<strong>' + (sw.realIndex + 1) + '</strong>' + ' / ' + (sw.slides.length - 2));
                        },
                    }
                });
                $(obj).find('.btn-playStop').on('click', function () {
                    if ($(this).hasClass('stop')) {
                        swiper.autoplay.start();
                        $(this).removeClass('stop').html('play');
                    }
                    else {
                        swiper.autoplay.stop();
                        $(this).addClass('stop').html('stop');
                    }
                });
            }
            $(this).each(function () {
                init(this);
            });
            return $(this);
        }
    });
    //recoSwiper
    $.extend($.fn, {
        recoSwiper: function () {
            var init = function (obj) {
                const swiper = new Swiper('.reco-swiper', {
                    preloadImages: false,
                    lazy: {
                        loadPrevNext: true
                    },
                    slidesPerView: 4.5,               // 5개의 슬라이드 보이기
                    centeredSlides: true,           // 가운데 슬라이드 중심으로 배치
                    loop: true,                     // 슬라이드 무한 루프
                    spaceBetween: 24,
                    autoplay: true,               // 슬라이드 사이의 간격
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4.5,
                        },
                    },
                });
            }
            $(this).each(function () {
                init(this);
            });
            return $(this);
        }
    });


    //itemSwiper
    $.extend($.fn, {
        itemSwiper: function () {
            var init = function (obj) {
                const swiper = new Swiper('.item-swiper', {
                    preloadImages: false,
                    lazy: {
                        loadPrevNext: true
                    },
                    slideToClickedSlide: false,
                    slidesPerView: 5,
                    initialSlide: 0,
                    watchSlidesProgress: true,
                    spaceBetween: 16,
                    pagination: false,
                    loop: false,
                    freeMode: true,
                    //observer: true,
                    //observeParents: true,
                    navigation: {
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next'
                    },
                    breakpoints: {
                        // mo
                        0: {
                            slidesPerView: 1.6,
                            spaceBetween: 12,
                            allowTouchMove: true,
                            preventClicks: true,
                            preventInteractionOnTransition: false
                        },
                        479: {
                            slidesPerView: 2.1,
                            spaceBetween: 8,
                            allowTouchMove: true,
                            preventClicks: true,
                            preventInteractionOnTransition: false
                        },
                        // tablet
                        767: {
                            slidesPerView: 2.5,
                            spaceBetween: 16,
                            allowTouchMove: true,
                            preventClicks: true,
                            preventInteractionOnTransition: false
                        },
                        // pc
                        1279: {
                            slidesPerView: 4,
                            spaceBetween: 16,
                            freeMode: false,
                            // allowTouchMove: false,
                            preventClicks: false,
                            preventInteractionOnTransition: true
                        }
                    }
                });
            }
            $(this).each(function () {
                init(this);
            });
            return $(this);
        }
    });

    $.datepicker.regional['ko'] = {
        closeText: '닫기',
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dateFormat: 'yy/mm/dd',
        firstDay: 0,
        isRTL: false,
        duration: 200,
        showAnim: 'show',
        showMonthAfterYear: true
        // yearSuffix: '년'
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);

    var datepickerExtensions = {
        _oldAdjustDate: $.datepicker._adjustDate,
        _adjustDate: function (id, offset, period) {
            var target = $(id),
                inst = this._getInst(target[0]);
            var afterAdjustDate = this._get(inst, 'afterAdjustDate');
            this._oldAdjustDate(id, offset, period);

            if (afterAdjustDate && typeof afterAdjustDate === 'function') {
                afterAdjustDate(id, offset, period);
            }
        },
        _oldSelectDay: $.datepicker._selectDay,
        _selectDay: function (id, month, year, td) {
            var inst,
                target = $(id);

            inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $("a", td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            this._selectDate(id, this._formatDate(inst,
                inst.currentDay, inst.currentMonth, inst.currentYear));

            this._oldSelectDay(id, month, year, td);

            var afterSelectDay = this._get(inst, 'afterSelectDay');
            if (afterSelectDay && typeof afterSelectDay === 'function') {
                afterSelectDay(id, month, year, td);
            }
        }
    }

    $.extend($.datepicker, datepickerExtensions);

})(jQuery);

//세로스크롤 여부 체크
var scollvCheck = function (obj) {
    return $(obj).get(0) ? $(obj).get(0).scrollHeight > $(obj).innerHeight() : false;
}

//popup center
var popupPosition = function (obj) {
    var w = parseInt($(obj).outerWidth()) / 2,
        h = parseInt($(obj).outerHeight()) / 2;
    var position = $(obj).css({ marginLeft: -w, marginTop: -h });
}

//pop open
var popupOpen = function (target, obj) {
    var op = obj; //클릭 요소
    var schObj = $('[data-popup="' + target + '"]'); //팝업 찾기
    var schObjClose = schObj.find('.pop-close, .close');
    var schObjTabbable = schObj.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
    var schObjTabbableFirst = schObjTabbable && schObjTabbable.first();
    var schObjTabbableLast = schObjTabbable && schObjTabbable.last();
    var tabDisable;

    function lpClose() { // 레이어 닫기 함수
        if (tabDisable === true) schObj.attr("tabindex", "-1");

        $(".video-js").each(function () {
            $(this)[0].player.pause();
        });
        schObj.fadeOut(200);
        op.focus(); // 레이어 닫은 후 원래 있던 곳으로 초점 이동
        //$(document).off("keydown.lp_keydown");
        $('.dim').hide();
        $('body').css({ 'overflow-y': 'auto' });
    }

    schObj.css({ 'display': 'flex' });//팝업 열기
    TweenMax.fromTo(schObj, .3, { css: { 'opacity': '0' } }, { css: { 'opacity': '1' } });//팝업 오픈 애니메이션
    $('.dim').show();
    $('body').css({ 'overflow-y': 'hidden' });
    $(this).blur();
    schObjTabbable.length ? schObjTabbableFirst.focus().on("keydown", function (event) {
        // 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
        if (event.shiftKey && (event.keyCode || event.which) === 9) {
            // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
            event.preventDefault();
            schObjTabbableLast.focus();
        }
    }) : schObj.attr("tabindex", "0").focus().on("keydown", function (event) {
        tabDisable = true;
        if ((event.keyCode || event.which) === 9) event.preventDefault();
        // Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
    });

    schObjTabbableLast.on("keydown", function (event) {
        if (!event.shiftKey && (event.keyCode || event.which) === 9) {
            // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
            event.preventDefault();
            schObjTabbableFirst.focus();
        }
    });

    // 폼 인풋에서 엔터키 치면 모달이 사라졌다 나타남..(dongjin)
    // $(this).on("keydown", function(event) {
    //     if (event.keyCode == 13) {
    //         event.preventDefault();
    //     }        
    // });

    schObjClose.on("click", lpClose); // 닫기 버튼 클릭 시 레이어 닫기
    // schObjClose.on("keydown", function(event) {
    //     if (event.keyCode == 13) {
    //         event.preventDefault();
    //         lpClose();
    //     }        
    // });
    $(this).on("layerClose", lpClose); // 닫기 버튼 클릭 시 레이어 닫기(dongjin)
    $('.dim').on("click", lpClose);
}

//popup close
var popupClose = function (target) {
    var $pop = $('[data-popup="' + target + '"]');
    $pop.fadeOut(200);
    $('.dim:not(.zindex-dim)').hide();
}

$(window).on('load', function () {
    //jquery-ui
    // $(".tabs").tabs();
    //$('select:not(select[multiple]):not(.normal)').selectmenu();
    //$("input[type=checkbox]:not(.normal), input[type=radio]:not(.normal)").checkboxradio();
    $('.datepicker').datepicker({
        showOn: "both",
        buttonImage: "../../../images/user/common/ico-cal.svg",
        buttonText: "기간 선택",
        // buttonImageOnly: true,
        changeMonth: true,
        changeYear: true
    });

    $(window).on('scroll', function () {
        $('#ui-datepicker-div').hide();
    });

    //faq
    $('.faq a').on('click', function () {
        if ($(this).closest('li').hasClass('is-open')) return;
        $(this).closest('.faq').find('.is-open').removeClass('is-open');
        $(this).closest('li').addClass('is-open');
    });

    //component
    $('.accordion, .learn-accordion').accordionFunc();
    $('.btn-arr-toggle').btnarrToggleFunc();
    $('.form-row').inputFocusFunc();
    $('.tabs-normal').tabsNormalFunc();
    $('.sch-lg-area').schLgFunc();
    $('.sort').sortFunc();

    //func
    $('.site-header').headerFunc();
    $('.site-gnb').gnbFunc();
    $('.site-nav-area').navFunc();

    //slick
    $('.top-swiper').topSwiper();
    //$('.banner-swiper').bannerSwiper();
    $('.item-swiper').itemSwiper();
    $('.reco-swiper').recoSwiper();

    $('.star-check').starCheckFunc();

    //비밀번호 show & hide
    $(document).on('click', '.btn-pw-toggle', function (e) {
        var $area = $(this).closest('.pw-area').toggleClass('is-active');
        if ($area.hasClass('is-active')) {
            $area.find('input').attr('type', "text");
        } else {
            $area.find('input').attr('type', 'password');
        }
    });
});

