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
            size: new google.maps.Size(38, 45),
            //origin: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(160, 45)
        };
        var marker = new google.maps.Marker({
            position: mapOptions.center,
            icon: icon
        });

        marker.setMap(map);
    },
    animate: function () {
        var numbers = [0.8, 1, 2],
            options = ['ease', 'linear', 'ease-out', 'ease-in-out'];
        var randomValue = function (array) {
            return array[Math.floor(Math.random() * array.length)]
        }
        $('.animate').find('li').eq(0).addClass('done');
        setInterval(function () {
            var el = $('.done').last().next();
            el.css({
                '-webkit-transition-property': '-webkit-transform 2s, opacity 2s',
                '-moz-transition-property': '-moz-transform 2s, opacity 2s',
                '-ms-transition-property': '-ms-transform 2s, opacity 2s',
                '-o-transition-property': '-o-transform 2s, opacity 2s',
                'transition-property': 'transform 2s, opacity 2s',
                'transition-duration': randomValue(numbers) + 's',
                'transition-timing-function': randomValue(options)
            });
            el.addClass('done');

        }, 50);


    }

}


$(function () {
    openDeviceLab.init();
    $(".js-responsive-text").fitText(1.2, {minFontSize: '16px', maxFontSize: '33px'});

});