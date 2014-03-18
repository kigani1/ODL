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
        var mapOptions = {
            center: new google.maps.LatLng(50.067161, 19.934900),
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
        self.addClass($('.animate.sync'), 50);
        $(window).scroll(function(){
            var top = $(this).scrollTop();
            if(top > $('.theme-light').offset().top -200){
               self.addClass($('.animate.async'), 500);
            }
        });

    }

}


$(function () {
    openDeviceLab.init();
    $(".js-responsive-text").fitText(1.2, {minFontSize: '16px', maxFontSize: '33px'});

});