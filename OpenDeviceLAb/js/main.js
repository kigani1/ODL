var openDeviceLab = {
    init: function(){
        var self = this;
        this.mapInit();
        $('.button').on('click' ,function (e) {
            self.scrollToPoint($('.google-map'));
            e.preventDefault();
        });
    },
    scrollToPoint : function(scrollTo){
        $('html, body').stop().animate({
            scrollTop: scrollTo.offset().top
        }, 1000);
    },
    mapInit: function(){
        var mapOptions = {
            center: new google.maps.LatLng(50.067161, 19.934900),
            zoom: 15
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        var marker=new google.maps.Marker({
            position:mapOptions.center
        });

        marker.setMap(map);
    }
}


$(function(){
    openDeviceLab.init();
});