// ====================================== мобильное меню
document.addEventListener('DOMContentLoaded', function () {
    const gamburger = document.querySelector('.gamburger')
    const firstLine = gamburger.querySelectorAll('span')[0]
    const middleLine = gamburger.querySelectorAll('span')[1]
    const lastLine = gamburger.querySelectorAll('span')[2]
    const mMenu = document.querySelector('.navi__menu')
    const mMenuOverlay = document.querySelector('.m-menu__overlay')
    $(gamburger).on('click', function () {
        middleLine.classList.toggle('open')
        firstLine.classList.toggle('open')
        lastLine.classList.toggle('open')
        mMenuOverlay.classList.toggle('m-menu__overlay--active')
        setTimeout(function () {
            mMenu.classList.toggle('navi__menu--active')
        }, 500)
    });
    $('.menu__link').click(function () {
        middleLine.classList.toggle('open')
        firstLine.classList.toggle('open')
        lastLine.classList.toggle('open')
        mMenuOverlay.classList.toggle('m-menu__overlay--active')
        setTimeout(function () {
            mMenu.classList.toggle('navi__menu--active')
        }, 500)
    });
});

// ====================================== progress bar
document.addEventListener('DOMContentLoaded', function () {
    const progress = document.querySelector('.progressbar__line');
    function scrollProgress() {
        const windowHeight = document.documentElement.clientHeight;
        const pageHeight = document.querySelector('body').offsetHeight - windowHeight;
        let scrollPer = (window.pageYOffset / pageHeight * 100);
        progress.style.width = scrollPer + "%";
    }
    document.addEventListener('scroll', function () {
        scrollProgress();
    });
});

// ====================================== скролл по клику 
$('.menu__link').click(function () {
    var scroll_elem = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(scroll_elem).offset().top - 100
    }, 1000);
    $('.menu__link').removeClass('menu__link--active')
    $(this).addClass('menu__link--active')
});

// ====================================== кнопка вверх
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.to-top').css('right', '50px');
    } else {
        $('.to-top').css('right', '-100%');
    }
});
$(function () {
    $('.to-top').on('click', function (e) {
        e.preventDefault();
        $('.menu__link').removeClass('menu__link--active')
        var plansOffset = $('.home').offset().top;
        $('html, body').animate({
            scrollTop: plansOffset
        }, 1000);
    });
});

// ====================================== подсветка активных пунктов
document.addEventListener('wheel', function () {
    $('section').each(function (i, el) {
        var top = $(el).offset().top - 100;
        var bottom = top + $(el).height();
        var scroll = $(window).scrollTop();
        var id = $(el).attr('id');
        if (scroll > top && scroll < bottom) {
            $('a.menu__link--active').removeClass('menu__link--active');
            $('a[href="#' + id + '"]').addClass('menu__link--active');
        }
    });
});

// ====================================== слайдер на первом экране
document.addEventListener('DOMContentLoaded', function () {
    function sliderLogic(slideSelector) {
        let slideIndex = 0,
            slides = document.querySelectorAll(slideSelector);
        setInterval(function () {
            nextSlide(1);
        }, 6000);
        goSlide(slideIndex);
        function goSlide(n) {
            if (n > slides.length - 1) {
                slideIndex = 0;
            }
            if (n < 0) {
                slideIndex = slides.length - 1;
            }
            slides.forEach(item => {
                item.style.display = 'none';
                item.classList.remove('animate__animated', 'animate__fadeIn');
            });
            slides[slideIndex].style.display = 'block';
            slides[slideIndex].classList.add('animate__animated', 'animate__fadeIn');
        }
        function nextSlide(n) {
            goSlide(slideIndex += n);
        }
    }
    sliderLogic('.slider-home__item');
});

/* ================================================= inputmask, форма обратной связи*/
$(document).ready(function () {
    $(":input").inputmask();
    $(".inputmask-phone").inputmask({
        mask: "+7 (999) 999-99-99",
        clearIncomplete: true
    });
    $('.inputmask-email').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        greedy: false,
        clearIncomplete: true,
        onBeforePaste: function (pastedValue, opts) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
        },
        definitions: {
            '*': {
                validator: "[0-9A-Za-z-а-я-]",
                casing: "lower"
            }
        }
    });
    $(".form__item--50 input").inputmask({
        mask: '99999',
        placeholder: ''
    });
    // =================== запрещаем ввод кол-ва масок выше 50 шт
    const form = document.querySelectorAll('.form');
    form.forEach(item => {
        let valuesMask = item.querySelector('.values-mask');
        valuesMask.addEventListener('blur', function () {
            if (valuesMask.value < 50) {
                valuesMask.value = 50
            }
        })
    });
    // ================ запрещаем ввод цифр в поле с именем
    document.querySelector('.fio').addEventListener('input', function () {
        this.value = this.value.replace(/[0-9]/, '');
    });

});

/* ================================================= галерея */
document.addEventListener('DOMContentLoaded', function () {
    const moreCasesBtn = document.querySelector('.cases__more')
    const cases = document.querySelector('.cases__full')
    moreCasesBtn.className = 'cases__more closed'
    moreCasesBtn.addEventListener('click', toggleCases);
    function toggleCases() {
        const thisClass = this.className;
        if (thisClass == 'cases__more closed') {
            this.className = 'cases__more active';
            this.innerText = 'скрыть все';
            cases.style.maxHeight = cases.scrollHeight + 'px';
        }
        if (thisClass == 'cases__more active') {
            this.className = 'cases__more closed';
            this.innerText = 'показать все';
            cases.style.maxHeight = 0;
        }
    }
});

// ======================================= контакты
document.addEventListener('DOMContentLoaded', function () {
    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [55.851449, 37.492635],
            zoom: 13,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        });
        // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point"
            },
        });
        myMap.geoObjects
            .add(myGeoObject)
            .add(new ymaps.Placemark([55.851449, 37.492635], {
                balloonContent: '<strong></strong>',
                iconCaption: 'г. Москва, ул. Флотская д. 5, стр. А'
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
            }));
        // тип карты - гибрид
        myMap.setType('yandex#publicMap');
        //отключаем зум колёсиком мышки
        myMap.behaviors.disable('scrollZoom');
        //на мобильных устройствах... (проверяем по userAgent браузера)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //... отключаем перетаскивание карты
            myMap.behaviors.disable('drag');
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map("map1", {
            center: [55.738495, 37.655688],
            zoom: 13,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        });
        // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point"
            },
        });
        myMap.geoObjects
            .add(myGeoObject)
            .add(new ymaps.Placemark([55.738495, 37.655688], {
                balloonContent: '<strong></strong>',
                iconCaption: 'г. Москва, Таганка (Большие Каменщики 9, стр. Б)'
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
            }));
        // тип карты - гибрид
        myMap.setType('yandex#publicMap');
        //отключаем зум колёсиком мышки
        myMap.behaviors.disable('scrollZoom');
        //на мобильных устройствах... (проверяем по userAgent браузера)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //... отключаем перетаскивание карты
            myMap.behaviors.disable('drag');
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
        const header = document.querySelector(headerSelector),
            tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);
        function hideContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });
            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
        }
        function showContent(i) {
            content[i].style.display = 'block';
            tab[i].classList.add(activeClass);
        }
        header.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            if (target &&
                (target.classList.contains(tabSelector.replace(/\./, "")) ||
                    target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
                tab.forEach((item, i) => {
                    if (target == item || target.parentNode == item) {
                        hideContent();
                        showContent(i);
                    }
                });
            }
        });
        hideContent();
        showContent(0);
    }
    tabs('.tabs__header', '.tabs__button', '.tabs__content', 'button--active');
});

// ======================================= animations GSAP
document.addEventListener('DOMContentLoaded', function () {

    let controller = new ScrollMagic.Controller();
    let tween = TweenMax.staggerFromTo('.home', 1,
        {
            opacity: "0"
        },
        {
            opacity: "1"
        }, 1);
    let scene = new ScrollMagic.Scene({
        triggerElement: ".home",
        duration: '0',
        offset: '0'
    })
        .setTween(tween)
        .addTo(controller);
    // ===============================
    let tween1 = TweenMax.staggerFromTo('.sizes__item', 1,
        {
            opacity: "0"
        },
        {
            opacity: "1"
        }, 0.3);
    let scene1 = new ScrollMagic.Scene({
        triggerElement: ".sizes",
        offset: 0
    })
        .setTween(tween1)
        .addTo(controller);
    // scene1.addIndicators();
    // ===============================
    let tween15 = TweenMax.staggerFromTo('.sizes__form', 1,
        {
            left: '-100px',
            opacity: "0"
        },
        {
            left: '0',
            opacity: "1"
        }, 0.3);
    let scene15 = new ScrollMagic.Scene({
        triggerElement: ".sizes",
        offset: 400
    })
        .setTween(tween15)
        .addTo(controller);
    // scene1.addIndicators();
    // ===============================
    let tween2 = TweenMax.staggerFromTo('.quality__bg', 1,
        {
            opacity: "0"
        },
        {
            opacity: "1"
        }, 0.3);
    let scene2 = new ScrollMagic.Scene({
        triggerElement: ".quality",
        offset: 0
    })
        .setTween(tween2)
        .addTo(controller);
    // scene2.addIndicators();
    // ===============================
    let tween3 = TweenMax.staggerFromTo('.quality__item--1', 1,
        {
            opacity: "0",
            right: '-100px'
        },
        {
            opacity: "1",
            right: '0'
        }, 0.3);
    let scene3 = new ScrollMagic.Scene({
        triggerElement: ".quality",
        offset: 200,
    })
        .setTween(tween3)
        .addTo(controller);
    // scene3.addIndicators();
    // ===============================
    let tween4 = TweenMax.staggerFromTo('.quality__item--2', 1,
        {
            opacity: "0",
            left: '-100px'
        },
        {
            opacity: "1",
            left: '0'
        }, 0.3);
    let scene4 = new ScrollMagic.Scene({
        triggerElement: ".quality",
        offset: 400,
    })
        .setTween(tween4)
        .addTo(controller);
    // scene4.addIndicators();
    // ===============================
    let tween5 = TweenMax.staggerFromTo('.quality__item--3', 1,
        {
            opacity: "0",
            right: '-100px'
        },
        {
            opacity: "1",
            right: '0'
        }, 0.3);
    let scene5 = new ScrollMagic.Scene({
        triggerElement: ".quality",
        offset: 600,
    })
        .setTween(tween5)
        .addTo(controller);
    // scene5.addIndicators();
    // ===============================
    let tween6 = TweenMax.staggerFromTo('.colors__item', 1,
        {
            transform: 'scale(0)'
        },
        {
            transform: 'scale(1)'
        }, 0.1);
    let scene6 = new ScrollMagic.Scene({
        triggerElement: ".colors",
        offset: 0,
    })
        .setTween(tween6)
        .addTo(controller);
    // scene6.addIndicators();
    // ===============================
    let tween7 = TweenMax.staggerFromTo('.advantages__item', 1,
        {
            left: '-100px',
            opacity: '0'
        },
        {
            left: '0',
            opacity: '1'
        }, 0.1);
    let scene7 = new ScrollMagic.Scene({
        triggerElement: ".advantages",
        offset: 0,
    })
        .setTween(tween7)
        .addTo(controller);
    // scene7.addIndicators();
    // ===============================
    let tween8 = TweenMax.staggerFromTo('.advantages__img', 1,
        {
            transform: 'scale(0)'
        },
        {
            transform: 'scale(1)'
        }, 0.1);
    let scene8 = new ScrollMagic.Scene({
        triggerElement: ".advantages",
        offset: 0,
    })
        .setTween(tween8)
        .addTo(controller);
    // scene8.addIndicators();
    // ===============================
    let tween9 = TweenMax.staggerFromTo('.examples__item', 1,
        {
            bottom: '-100px',
            opacity: '0'
        },
        {
            bottom: '0',
            opacity: '1'
        }, 0.1);
    let scene9 = new ScrollMagic.Scene({
        triggerElement: ".examples",
        offset: 0,
    })
        .setTween(tween9)
        .addTo(controller);
    // scene9.addIndicators();
    // =========================
    let tween10 = TweenMax.staggerFromTo('.approach__line', 1,
        {
            width: '0'
        },
        {
            width: '100%'
        }, 0.1);
    let scene10 = new ScrollMagic.Scene({
        triggerElement: ".approach__line",
        offset: -300,
    })
        .setTween(tween10)
        .addTo(controller);
    // scene10.addIndicators();
    // ===============================
    let tween11 = TweenMax.staggerFromTo('.cases__item', 1,
        {
            top: '-100px',
            opacity: '0'
        },
        {
            top: '0',
            opacity: '1'
        }, 0.1);
    let scene11 = new ScrollMagic.Scene({
        triggerElement: ".cases",
        offset: 0,
    })
        .setTween(tween11)
        .addTo(controller);
    // scene11.addIndicators();
    // =========================
    let tween12 = TweenMax.staggerFromTo('.about', 1,
        {
            opacity: '0'
        },
        {
            opacity: '1'
        }, 0.1);
    let scene12 = new ScrollMagic.Scene({
        triggerElement: ".about",
        offset: 0,
    })
        .setTween(tween12)
        .addTo(controller);
    // scene12.addIndicators();
    // =========================
    let tween13 = TweenMax.staggerFromTo('.contacts__map', 1,
        {
            bottom: '-100px',
            opacity: '0'
        },
        {
            bottom: '0',
            opacity: '1'
        }, 0.1);
    let scene13 = new ScrollMagic.Scene({
        triggerElement: ".contacts",
        offset: 0,
    })
        .setTween(tween13)
        .addTo(controller);
    // scene13.addIndicators();
    // =========================
    let tween14 = TweenMax.staggerFromTo('.footer__line', 1,
        {
            width: '0'
        },
        {
            width: '100%'
        }, 0.1);
    let scene14 = new ScrollMagic.Scene({
        triggerElement: ".footer",
        offset: 0,
    })
        .setTween(tween14)
        .addTo(controller);
    // scene14.addIndicators();


});