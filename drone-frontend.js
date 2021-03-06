function init() {
    tracker = initTracker("#example");
    tracking.track("#example .drone", tracker);
}

function initTracker(element) {
    // Initialise a color tracker
    var tracker = new tracking.ColorTracker();

    // We only want rectangles that have each dimension no smaller than 20 pixels
    // tracker.setMinDimension(20);

    // The colors we're interested in
    TrackerUtils.addTrackingColor("#A94A45", "red", tracker);
    TrackerUtils.addTrackingColor("#e50000", "red", tracker);

    TrackerUtils.addTrackingColor("#5EA24E", "green", tracker);


    TrackerUtils.addTrackingColor("#CB7F84", "magenta", tracker);
    TrackerUtils.startTrackingColors(tracker);

    // Whenever there is a new color detected, mark them
    tracker.on('track', function(event) {
        markColors(event.data, element);
        console.log(event.data);
    });

    return tracker;
}

function markColors(colors, element) {
    // Do the marking
    // Remove previously drawn rectangles indicating detected colors
    // Get the drawing surface
    var canvas = $(element + ' .canvas').get(0);
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, context.width, context.height);
    for (var i = 0; i < colors.length; i++) {
        drawRectangle(colors[i], context);
        writeRectangle(colors[i], element + " .output");
    }

    function drawRectangle(rect, context) {
        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }

    function writeRectangle(rect, element) {
        $(element)
            .append("<p>")
            .append(rect.color + ": " + rect.width + "X" + rect.height)
            .append(" @ " + rect.x + ":" + rect.y)
    }

}

window.addEventListener("load", init);
