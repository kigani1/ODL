$(function () {
    openDeviceLab.init();
    $(".js-responsive-text").fitText(1.2, {minFontSize: '16px', maxFontSize: '33px'});
    $(".js-cnv-animation").each(function () {
        // Get context
        var canvas = $(this).children("canvas")[0];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");

            var height = $('#cnv-curves').height();
            var width = $('#cnv-curves').width();
            // Draw lines
            var prune = $(this).attr("id") == "cnv-curves";

            drawVineWithLattice(ctx, new Array(), (width * 0.5), (height * 0.8), 100, false, prune);


            $(window).resize(function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                //wait for resize event is finished and then recalculate the data
                waitForFinalEvent(function () {
                    drawVineWithLattice(ctx, new Array(), (width * 0.5), (height * 0.8), 100, false, prune);
                }, 500, "resize event finished");
            });
        }
    });
});