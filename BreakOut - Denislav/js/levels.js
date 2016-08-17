function levelOne(brick) {
    level1BrickNumber = 176;
    brick.colorBrick = "firebrick";
    for(var x =13;x < 18;x++){
        createBrick(x,0,brick)
    }
    createBrick(11,1,brick);
    createBrick(12,1,brick);
    createBrick(18,1,brick);
    createBrick(19,1,brick);

    createBrick(10,2,brick);
    createBrick(20,2,brick);

    createBrick(9,3,brick);
    createBrick(21,3,brick);

    createBrick(9,4,brick);
    createBrick(21,4,brick);

    for(var i =8;i<23;i++){
        createBrick(i,5,brick);
    }

    for(var x =8;x < 23;x++){
        if(x != 9 && x != 11 && x != 12 && x != 17 && x != 18 && x != 21){
            createBrick(x,6,brick)
        }
    }

    for(var x =8;x < 23;x++){
        if(x != 9 && x != 11 && x != 15 && x != 17 && x != 21){
            createBrick(x,7,brick)
        }

    }

    createBrick(8,8,brick);
    createBrick(11,8,brick);
    createBrick(12,8,brick);
    createBrick(13,8,brick);
    createBrick(17,8,brick);
    createBrick(18,8,brick);
    createBrick(19,8,brick);
    createBrick(22,8,brick);

    createBrick(8,9,brick);
    createBrick(22,9,brick);

    createBrick(9,10,brick);
    createBrick(18,10,brick);
    createBrick(21,10,brick);

    createBrick(9,11,brick);
    createBrick(14,11,brick);
    createBrick(15,11,brick);
    createBrick(16,11,brick);
    createBrick(17,11,brick);
    createBrick(21,11,brick);

    createBrick(10,12,brick);
    createBrick(19,12,brick);

    createBrick(11,13,brick);
    createBrick(12,13,brick);
    createBrick(18,13,brick);
    createBrick(19,13,brick);

    for(var x =13;x < 18;x++){
        createBrick(x,14,brick)
    }

    brick.colorBrick = "yellow";

    for(var x =13;x < 18;x++){
        createBrick(x,1,brick)
    }

    for(var x =11;x < 20;x++){
        createBrick(x,2,brick)
    }
    for(var x =10;x < 21;x++){
        for(var y=3;y<5;y++){
            createBrick(x,y,brick)
        }
    }

    createBrick(9,6,brick);
    createBrick(21,6,brick);

    createBrick(9,7,brick);
    createBrick(21,7,brick);
    createBrick(15,7,brick);

    createBrick(9,8,brick);
    createBrick(10,8,brick)
    createBrick(14,8,brick);
    createBrick(15,8,brick);
    createBrick(16,8,brick);
    createBrick(20,8,brick);
    createBrick(21,8,brick)

    for(var x =9;x < 22;x++){
        createBrick(x,9,brick)
    }
    for(var x =10;x < 21;x++){
        if(x != 18)
        createBrick(x,10,brick)
    }
    for(var x =10;x < 21;x++){
        if(x != 17 && x != 14 && x != 15 && x != 16)
            createBrick(x,11,brick)
    }

    for(var x =11;x < 19;x++){
            createBrick(x,12,brick)
    }

    for(var x =13;x < 18;x++){
        createBrick(x,13,brick)
    }

    brick.colorBrick = "white";
    createBrick(18,6,brick);
    createBrick(17,6,brick);
    createBrick(11,6,brick);
    createBrick(12,6,brick);

    createBrick(11,7,brick);
    createBrick(17,7,brick);


    levelOneMaxScore = level1BrickNumber;
}

function levelTwo(brick) {
    level2BrickNumber = 1;
    brick.colorBrick = "green";
    createBrick(30,0,brick);

    levelTwoMaxScore = levelOneMaxScore + level2BrickNumber;
}

function levelThree(brick) {
    level3BrickNumber = 1;
    brick.colorBrick = "yellow";
    createBrick(25,0,brick);

    levelThreeMaxScore = levelTwoMaxScore + level3BrickNumber;
   
}