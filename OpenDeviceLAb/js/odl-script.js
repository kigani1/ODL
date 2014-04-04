var waitForFinalEvent = (function () {
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
})();

var openDeviceLab = {
    init: function () {
        var self = this;
        this.mapInit();
        this.animate();
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        $('a').on('touchstart click', function (e) {
            var goTo = $(this).attr('href');
            if (goTo == '#map-section') {
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
        var isDraggable = window.matchMedia("(min-width: 767px)").matches ? true : false;
        var mapOptions = {
            center: new google.maps.LatLng(50.067161, 19.934900),
            draggable: isDraggable,
            zoom: 15
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        var icon = {
            url: "img/sprite.png",
            size: new google.maps.Size(38, 50),
            scaledSize: new google.maps.Size(168, 88)
        };
        var marker = new google.maps.Marker({
            position: mapOptions.center,
            icon: icon
        });
        marker.setMap(map);
    },
    addClass: function(el, value){
        el.map(function(){
            var self = this;
            $(this).find('li').eq(0).addClass('done');
            setInterval(function () {
                var el = $(self).find('.done').last().next();
                el.addClass('done');
            }, value);
        });
    },
    animate: function () {
        var self = this;
        var currBox = $('.animation-bg');
        self.addClass($('.animate.sync'), 50);
        $(window).scroll(function(){
            var top = $(this).scrollTop();
            if(top > currBox.offset().top -200 && top < currBox.next().offset().top){
                self.addClass($('.animate.async'), 500);
            }else if(top > currBox.next().offset().top || top <  currBox.prev().offset().top ){
              
             $('.animate.async').find('li').removeClass('done')
           }
        });

    }
}