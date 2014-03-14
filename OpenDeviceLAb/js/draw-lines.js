function drawVineWithLattice(context, lattice, x, y, interations, sort, prune) {

    // Set stroke colour
    context.lineWidth = 1.5;
    context.strokeStyle = "rgb(255, 255, 255)";

    // Create initial branch
    var branches = new Array();
    branches.push({
        points: new Array({x: x, y: y}, {x: x, y: y}, {x: x, y: y}, {x: x, y: y}),
        angle: 0,
        distanceToLattice: 10000
    });

    // Start drawing splines at t=0
    var t = 0;

    // Drawing interval
    var interval = setInterval(function () {

        // Draw branches
        for (var i in branches) {

            // Draw spline segment
            var ax = (-branches[i].points[0].x + 3 * branches[i].points[1].x - 3 * branches[i].points[2].x + branches[i].points[3].x) / 6;
            var ay = (-branches[i].points[0].y + 3 * branches[i].points[1].y - 3 * branches[i].points[2].y + branches[i].points[3].y) / 6;
            var bx = (branches[i].points[0].x - 2 * branches[i].points[1].x + branches[i].points[2].x) / 2;
            var by = (branches[i].points[0].y - 2 * branches[i].points[1].y + branches[i].points[2].y) / 2;
            var cx = (-branches[i].points[0].x + branches[i].points[2].x) / 2;
            var cy = (-branches[i].points[0].y + branches[i].points[2].y) / 2;
            var dx = (branches[i].points[0].x + 4 * branches[i].points[1].x + branches[i].points[2].x) / 6;
            var dy = (branches[i].points[0].y + 4 * branches[i].points[1].y + branches[i].points[2].y) / 6;
            context.beginPath();
            context.moveTo(
                ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx,
                ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy
            );

            context.lineTo(
                ax * Math.pow(t + 0.1, 3) + bx * Math.pow(t + 0.1, 2) + cx * (t + 0.1) + dx,
                ay * Math.pow(t + 0.1, 3) + by * Math.pow(t + 0.1, 2) + cy * (t + 0.1) + dy
            );
            context.stroke();
            context.closePath();
        }

        // Advance t
        t += 0.1;

        // When finished drawing splines, create a new set of branches
        if (t >= 1) {

            // Create array to store next iteration of branchces
            var new_branches = new Array();

            // Iterate over each branch
            for (var j in branches) {

                // Replace with 2 new branches
                for (var k = 0; k < 2; k++) {

                    // Generate random deviation from previous angle
                    var angle = branches[j].angle - (Math.random() * 180 - 90);

                    // Determine closest lattice point
                    var distanceToLattice = 100000
                    for (var l in lattice) {
                        var result = distancePointToLine(branches[j].points[3], lattice[l]);
                        if (result < distanceToLattice) distanceToLattice = result;
                    }

                    // Generate random length
                    var length = Math.random() * 200 + 80;

                    // Calculate new point
                    var x2 = branches[j].points[3].x + Math.sin(Math.PI * angle / 180) * length;
                    var y2 = branches[j].points[3].y - Math.cos(Math.PI * angle / 180) * length;

                    // Add to new branch array
                    new_branches.push({
                        points: new Array(
                            branches[j].points[1],
                            branches[j].points[2],
                            branches[j].points[3],
                            {x: x2, y: y2}
                        ),
                        angle: angle,
                        distanceToLattice: distanceToLattice
                    });
                }
            }

            // Sort branches by distance to lattice
            new_branches.sort(function (a, b) {
                return a.distanceToLattice - b.distanceToLattice;
            });

            // If over 10 branches, prune the branches furthest from the lattice
            if (prune) {
                if (sort) {
                    while (new_branches.length > 10) new_branches.pop();
                } else {
                    while (new_branches.length > 10) {
                        new_branches.splice(Math.floor(Math.random() * new_branches.length), 1);
                    }
                }
            }

            // Replace old branch array with new
            branches = new_branches;

            // Restart drawing splines at t=0
            t = 0;
        }

        // Count interations
        interations--;
        if (interations < 0) clearInterval(interval);

    }, 16.67);

    // Return interval
    return interval;
}


function distancePointToLine(point, line) {

    // Length of line segment
    var L = Math.sqrt(Math.pow(line[1].x - line[0].x, 2) + Math.pow(line[1].y - line[0].y, 2));

    // Calculate position of projection along line segment
    var r = ((point.x - line[0].x) * (line[1].x - line[0].x) + (point.y - line[0].y) * (line[1].y - line[0].y)) / Math.pow(L, 2);

    // Calculate distance of point to projection
    var s = ((line[0].y - point.y) * (line[1].x - line[0].x) - (line[0].x - point.x) * (line[1].y - line[0].y)) / Math.pow(L, 2);

    // Calculate perpendicular projection of point on line
    if (r >= 0 && r <= 1) {
        return Math.abs(s) * L;
    } else {
        return Math.min(
            Math.sqrt(Math.pow(point.x - line[0].x, 2) + Math.pow(point.y - line[0].y, 2)),
            Math.sqrt(Math.pow(point.x - line[1].x, 2) + Math.pow(point.y - line[1].y, 2))
        );
    }
}


// Get context
$(document).ready(function () {


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
        }


    });
});