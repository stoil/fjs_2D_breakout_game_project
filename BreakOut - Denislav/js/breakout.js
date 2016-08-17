var showLevelMessage = false;

updateStatus();

function draw() {
    var ball = new Ball(ballStartWidthPosition, ballStartHeightPosition, ballRadius, 0, Math.PI * 2, ballColor);
    var paddle = new Paddle(paddleWidth, paddleHeight, paddleStartPosition, paddleColor);
    var brick = new Brick(brickWidth, brickHeight, brickPadding, "red", 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    levelMessage();
    drawBall(ball);
    drawPaddle(paddle);
    drawBricks(brick);
    drawScore();
    drawLives();
    drawLevel();
    movePaddle(paddle);
    touchWalls(ball, paddle);
    collisionDetection(brick);

    ballStartWidthPosition += changeWidthPosition;
    ballStartHeightPosition += changeHeightPosition;

    requestAnimationFrame(draw);
}

function touchWalls(ball, paddle) {
    if (ballStartWidthPosition + changeWidthPosition > canvas.width - ball.radius || ballStartWidthPosition + changeWidthPosition < ball.radius) {
        changeWidthPosition = -changeWidthPosition;
    }
    if (ballStartHeightPosition + changeHeightPosition < ball.radius) {
        changeHeightPosition = -changeHeightPosition;
    }
    else if (ballStartHeightPosition + changeHeightPosition > canvas.height - ball.radius * 2) {
        if (ballStartWidthPosition > paddle.paddleStartPosition && ballStartWidthPosition < paddleStartPosition + paddle.widthPaddle) {
            changePathWhenTouchPaddle(paddle, ball);
        }
        else {
            lives--;
            if (lives < 1) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                beginningPhase();
            }
        }
    }
}

function movePaddle(paddle) {
    if (changeHeightPosition == 0 && changeWidthPosition == 0) {
        if (rightPressed && paddle.paddleStartPosition < canvas.width - paddle.widthPaddle) {
            paddleStartPosition += paddleSpeed;
            ballStartWidthPosition += paddleSpeed;
        }
        else if (leftPressed && paddle.paddleStartPosition > 0) {
            paddleStartPosition -= paddleSpeed;
            ballStartWidthPosition -= paddleSpeed;
        }
    } else if (rightPressed && paddle.paddleStartPosition < canvas.width - paddle.widthPaddle) {
        paddleStartPosition += paddleSpeed;
    }
    else if (leftPressed && paddle.paddleStartPosition > 0) {
        paddleStartPosition -= paddleSpeed;
    }
}

function collisionDetection(brick) {
    for (i = 0; i < brickColumnCount; i++) {
        for (f = 0; f < brickRowCount; f++) {
            var b = bricks[i][f];
            if (b.status == 1) {
                if (ballStartWidthPosition > b.x && ballStartWidthPosition < b.x + brick.widthBrick && ballStartHeightPosition > b.y && ballStartHeightPosition < b.y + brick.heightBrick + ballRadius) {
                    changeHeightPosition = -changeHeightPosition;
                    b.status = 0;
                    score++;
                    if (score == levelOneMaxScore) {
                        updateStatus();
                        showLevelMessage = true;
                        level = 2;
                        beginningPhase();
                    }
                    if (score == levelTwoMaxScore) {
                        updateStatus();
                        showLevelMessage = true;
                        level = 3;
                        beginningPhase();
                    }
                    if (score == levelThreeMaxScore) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function updateStatus() {
    for (i = 0; i < brickColumnCount; i++) {
        bricks[i] = [];
        for (f = 0; f < brickRowCount; f++) {
            bricks[i][f] = {x: 0, y: 0, status: 1};
        }
    }
}

function beginningPhase() {
    ballStartWidthPosition = canvas.width / 2;
    ballStartHeightPosition = canvas.height - paddleHeight - ballRadius;
    changeWidthPosition = 0;
    changeHeightPosition = 0;
    paddleStartPosition = (canvas.width - paddleWidth) / 2;
    spaceClick = true;
}

function changePathWhenTouchPaddle(paddle, ball) {
    var partSize = paddle.widthPaddle / 21;
    var part1 = paddleStartPosition + partSize;
    var part2 = paddleStartPosition + partSize * 2;
    var part3 = paddleStartPosition + partSize * 3;
    var part4 = paddleStartPosition + partSize * 4;
    var part5 = paddleStartPosition + partSize * 5;
    var part6 = paddleStartPosition + partSize * 6;
    var part7 = paddleStartPosition + partSize * 7;
    var part8 = paddleStartPosition + partSize * 8;
    var part9 = paddleStartPosition + partSize * 9;
    var part10 = paddleStartPosition + partSize * 10;
    var part11 = paddleStartPosition + partSize * 11;
    var part12 = paddleStartPosition + partSize * 12;
    var part13 = paddleStartPosition + partSize * 13;
    var part14 = paddleStartPosition + partSize * 14;
    var part15 = paddleStartPosition + partSize * 15;
    var part16 = paddleStartPosition + partSize * 16;
    var part17 = paddleStartPosition + partSize * 17;
    var part18 = paddleStartPosition + partSize * 18;
    var part19 = paddleStartPosition + partSize * 19;
    var part20 = paddleStartPosition + partSize * 20;
    var part21 = paddleStartPosition + paddle.widthPaddle;

    
        if (ballStartWidthPosition > paddleStartPosition && ballStartWidthPosition < part1) {
            changeHeightPosition = -5;
            changeWidthPosition = -10;
        }
        if (ballStartWidthPosition > part1 && ballStartWidthPosition < part2) {
            changeHeightPosition = -5;
            changeWidthPosition = -9;
        }
        if (ballStartWidthPosition > part2 && ballStartWidthPosition < part3) {
            changeHeightPosition = -5;
            changeWidthPosition = -8;
        }
        if (ballStartWidthPosition > part3 && ballStartWidthPosition < part4) {
            changeHeightPosition = -5;
            changeWidthPosition = -7;
        }
        if (ballStartWidthPosition > part4 && ballStartWidthPosition < part5) {
            changeHeightPosition = -5;
            changeWidthPosition = -6;
        }
        if (ballStartWidthPosition > part5 && ballStartWidthPosition < part6) {
            changeHeightPosition = -5;
            changeWidthPosition = -5;
        }
        if (ballStartWidthPosition > part6 && ballStartWidthPosition < part7) {
            changeHeightPosition = -5;
            changeWidthPosition = -4;
        }
        if (ballStartWidthPosition > part7 && ballStartWidthPosition < part8) {
            changeHeightPosition = -5;
            changeWidthPosition = -3;
        }
        if (ballStartWidthPosition > part8 && ballStartWidthPosition < part9) {
            changeHeightPosition = -5;
            changeWidthPosition = -2;
        }
        if (ballStartWidthPosition > part9 && ballStartWidthPosition < part10) {
            changeHeightPosition = -5;
            changeWidthPosition = -1;
        }
        if (ballStartWidthPosition > part10 && ballStartWidthPosition < part11) {
            changeHeightPosition = -5;
            changeWidthPosition = 0;
        }
        if (ballStartWidthPosition > part11 && ballStartWidthPosition < part12) {
            changeHeightPosition = -5;
            changeWidthPosition = 1;
        }
        if (ballStartWidthPosition > part12 && ballStartWidthPosition < part13) {
            changeHeightPosition = -5;
            changeWidthPosition = 2;
        }
        if (ballStartWidthPosition > part13 && ballStartWidthPosition < part14) {
            changeHeightPosition = -5;
            changeWidthPosition = 3;
        }
        if (ballStartWidthPosition > part14 && ballStartWidthPosition < part15) {
            changeHeightPosition = -5;
            changeWidthPosition = 4;
        }
        if (ballStartWidthPosition > part15 && ballStartWidthPosition < part16) {
            changeHeightPosition = -5;
            changeWidthPosition = 5;
        }
        if (ballStartWidthPosition > part16 && ballStartWidthPosition < part17) {
            changeHeightPosition = -5;
            changeWidthPosition = 6;
        }
        if (ballStartWidthPosition > part17 && ballStartWidthPosition < part18) {
            changeHeightPosition = -5;
            changeWidthPosition = 7;
        }
        if (ballStartWidthPosition > part18 && ballStartWidthPosition < part19) {
            changeHeightPosition = -5;
            changeWidthPosition = 8;
        }
        if (ballStartWidthPosition > part19 && ballStartWidthPosition < part20) {
            changeHeightPosition = -5;
            changeWidthPosition = 9;
        }
        if (ballStartWidthPosition > part20 && ballStartWidthPosition < part21) {
            changeHeightPosition = -5;
            changeWidthPosition = 10;
        }
}

draw();