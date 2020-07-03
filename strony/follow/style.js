$(document).ready(function() {

    var foundActive = false,
        activeElement, linePosition = 0,
        menuLine = $(".line"),
        lineWidth, lineColor, defaultPosition, defaultWidth, defaultColor;

    $(".main > ul > li").each(function() {
        if ($(this).hasClass('active')) {
            activeElement = $(this);
            foundActive = true;
        }
    });

    if (foundActive === false) {
        activeElement = $(".main > ul > li").first();
    }

    defaultWidth = lineWidth = activeElement.outerWidth();

    defaultPosition = linePosition = activeElement.position().left;

    defaultColor = lineColor = activeElement.data("color");

    menuLine.css("width", lineWidth);
    menuLine.css("left", linePosition);
    menuLine.css("background-color", lineColor);

    $(".main > ul > li").hover(function() {
            activeElement = $(this);
            lineWidth = activeElement.outerWidth();
            linePosition = activeElement.position().left;
            lineColor = activeElement.data("color");
            menuLine.css("width", lineWidth);
            menuLine.css("left", linePosition);
            menuLine.css("background-color", lineColor);
        },
        function() {
            menuLine.css("left", defaultPosition);
            menuLine.css("width", defaultWidth);
            menuLine.css("background-color", defaultColor);
        });


});
