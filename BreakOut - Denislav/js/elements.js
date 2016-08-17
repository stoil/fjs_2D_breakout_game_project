/**
 * Created by admin on 30.7.2016 г..
 */

var canvas = $("#myCanvas")[0];
var ctx = canvas.getContext("2d");

// Paddle properties
var paddleHeight = 10;
var paddleWidth = 200;
var paddleStartPosition = (canvas.width - paddleWidth) / 2;
var paddleColor = "slategray";
var paddleSpeed = 10;

// Ball properties
var ballRadius = 7;
var ballStartWidthPosition = canvas.width / 2;
var ballStartHeightPosition = canvas.height - paddleHeight - ballRadius;
var ballColor = "white";
var changeWidthPosition = 0;
var changeHeightPosition = 0;
var ballSpeed = 5;

//Brick properties
var bricks = [];
var brickRowCount = 20;
var brickColumnCount = 31;
var brickWidth = 50;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Score properties
var score = 0;
var scoreFont = "16px Arial";
var scoreColor = "white";
var levelOneMaxScore;
var levelTwoMaxScore;
var levelThreeMaxScore;

//Lives properties
var lives = 3;
var livesFont = "16px Arial";
var livesColor = "white";

//Level
var level = 1;
var levelFont = "16px Arial";
var levelColor = "white";

var Ball = function (widthBall, heightBall, radius, startAngle, endAngle, colorBall) {
    this.widthBall = widthBall;
    this.heightBall = heightBall;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.colorBall = colorBall;
};

var Paddle = function (widthPaddle, heightPaddle, paddleStartPosition, colorPaddle) {
    this.widthPaddle = widthPaddle;
    this.heightPaddle = heightPaddle;
    this.colorPaddle = colorPaddle;
    this.paddleStartPosition = paddleStartPosition;
};

var Brick = function (widthBrick, heightBrick, paddingBrick, colorBrick) {
    this.widthBrick = widthBrick;
    this.heightBrick = heightBrick;
    this.paddingBrick = paddingBrick;
    this.colorBrick = colorBrick;
};


function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.widthBall, ball.heightBall, ball.radius, ball.startAngle, ball.endAngle);
    ctx.fillStyle = ball.colorBall;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(paddle) {
    ctx.beginPath();
    ctx.rect(paddle.paddleStartPosition, canvas.height - paddle.heightPaddle, paddle.widthPaddle, paddle.heightPaddle);
    ctx.fillStyle = paddle.colorPaddle;
    ctx.fill();
    ctx.closePath();
}

function drawBricks(brick) {
    switch (level) {
        case 1:
            levelOne(brick);
            break;
        case 2:
            levelTwo(brick);
            break;
        case 3:
            levelThree(brick);
            break;
    }
}

function drawScore() {
    ctx.font = scoreFont;
    ctx.fillStyle = scoreColor;
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = livesFont;
    ctx.fillStyle = livesColor;
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawLevel() {
    ctx.font = levelFont;
    ctx.fillStyle = levelColor;
    ctx.fillText("Level: " + level, canvas.width / 2, 20);
}

function levelMessage() {
    if (showLevelMessage) {
        ctx.fillStyle = "slategray";
        ctx.font = "100px _sans";
        ctx.textBaseline = "top";
        ctx.fillText("Level " + level, 800, 750);
    }
}

function winMessage() {
    if(showWinMesssage){
        ctx.fillStyle = "red";
        ctx.font = "100px Sans";
        ctx.textBaseline = "top";
        ctx.fillText("Congratulations !", 620, 100);
        ctx.fillText("YOU WIN  !", 700, 300);
    }
}

function createBrick(coloumNumber, rowNumber, brick) {
    if (bricks[coloumNumber][rowNumber].status == 1) {
        var brickX = (coloumNumber * (brick.widthBrick + brick.paddingBrick)) + brickOffsetLeft;
        var brickY = (rowNumber * (brick.heightBrick + brick.paddingBrick)) + brickOffsetTop;
        bricks[coloumNumber][rowNumber].x = brickX;
        bricks[coloumNumber][rowNumber].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brick.widthBrick, brick.heightBrick);
        ctx.fillStyle = brick.colorBrick;
        ctx.fill();
        ctx.closePath();
    }
}