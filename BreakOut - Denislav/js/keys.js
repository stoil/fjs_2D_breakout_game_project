/**
 * Created by admin on 30.7.2016 г..
 */
// Keys properties
var rightPressed = false;
var leftPressed = false;
var leftArrowKeyCode = 37;
var rightArrowKeyCode = 39;
var spaceKey = 32;
var spaceClick = true;

$(document).bind("keydown", function (e) {
    if (e.keyCode == rightArrowKeyCode) {
        rightPressed = true;
    }
    else if (e.keyCode == leftArrowKeyCode) {
        leftPressed = true;
    }
});
$(document).bind("keyup", function (e) {
    if (e.keyCode == rightArrowKeyCode) {
        rightPressed = false;
    }
    else if (e.keyCode == leftArrowKeyCode) {
        leftPressed = false;
    }
    else if (e.keyCode == spaceKey && spaceClick == true) {
        showLevelMessage = false;
        spaceClick = false;
        changeWidthPosition = ballSpeed;
        changeHeightPosition = -ballSpeed;
    }
});