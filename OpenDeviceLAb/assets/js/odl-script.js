var waitForFinalEvent = (function () {
    'use strict';
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
}());


var PageModule = (function () {
   'use strict'; 
   var OpenDeviceLab = {
        init: function () {
            var self = this,
                isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            this.mapInit();
            this.animate();

            $('a').on('touchstart click', function (e) {
                var goTo = $(this).attr('href');
                if (goTo === '#map-section') {
                    self.scrollToPoint($('.google-map').prev('.section-heading'));
                    e.preventDefault();
                }
            });
            if (!isMobile) {
                $('body').addClass('hover-on');
            }
        },
        scrollToPoint: function (scrollTo) {
            $('html, body').stop().animate({
                scrollTop: scrollTo.offset().top
            }, 1000);
        },

        mapInit: function () {
            var mql = window.matchMedia,
                isDraggable = true;

            if (mql !== undefined) {
                isDraggable = window.matchMedia("(min-width: 767px)").matches ? true : false;
            }
            var mapOptions = {
                center: new google.maps.LatLng(50.067161, 19.934900),
                draggable: isDraggable,
                zoom: 15
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            var icon = {
                url: "img/sprite.png",
                size: new google.maps.Size(38, 50),
                scaledSize: new google.maps.Size(200, 88)
            };
            var marker = new google.maps.Marker({
                position: mapOptions.center,
                icon: icon
            });
            marker.setMap(map);
        },
        addClass: function (el, value) {
            el.each(function () {
                var self = this;
                $(this).find('li').eq(0).addClass('done');
                setInterval(function () {
                    var el = $(self).find('.done').last().next();
                    el.addClass('done');
                }, value);
            });
        },
        animate: function () {
            var self = this,
                currBox = $('.animation-bg'),
                viewportHeight = $(window).height(),
                check = currBox.next().offset().top;
            self.addClass($('.animate.sync'), 200);
            $(window).scroll(function () {
                var top = $(this).scrollTop();
                if (top > (check - viewportHeight) && top < check) {
                    self.addClass($('.animate.async'), 500);
                }else if (top > check || top <  currBox.offset().top) {   
                 $('.animate.async').find('li').removeClass('done');
               }
            });

        }
    };
    return OpenDeviceLab;
}());


