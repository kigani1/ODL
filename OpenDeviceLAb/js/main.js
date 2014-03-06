var openDeviceLab = {
    init: function () {
        var self = this;
        this.mapInit();
        this.animate();
        $('.button').on('click', function (e) {
            self.scrollToPoint($('.google-map'));
            e.preventDefault();
        });
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
        var marker = new google.maps.Marker({
            position: mapOptions.center
        });

        marker.setMap(map);
    },
    animate: function () {
        var numbers =[0.8, 1, 2],
            options = ['ease', 'linear',  'ease-out', 'ease-in-out'];
        var randomValue = function(array){
           return array[Math.floor(Math.random() * array.length)]
        }
        $('.animate').find('li').eq(0).addClass('done')
        setInterval(function () {
                var el = $('.done').last().next();
                el.css('transition-duration', randomValue(numbers)+ 's');
                el.css('transition-timing-function', randomValue(options));
                el.addClass('done');

        }, 50);


    }
}


$(function () {
    openDeviceLab.init();


});