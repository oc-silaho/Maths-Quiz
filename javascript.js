//variables
var playing = false;
var score;
var timeRemaining;
var correctAnswer;
var heart;

//if we click on the start/reset button
document.getElementById("startReset").onclick = function () {
    if (playing == true) {
        location.reload();
    }
    else {
        playing = true;
        score = 0;
        heart = 3;
        document.getElementById("scoreValue").innerHTML = score;
        show("scoreContent");
        document.getElementById("score").style.backgroundColor = "#008000";
        show("timeRemainingContent");
        document.getElementById("timeRemaining").style.backgroundColor = "#008000";
        timeRemaining = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        hide("gameOverBox");
        document.getElementById("startReset").innerHTML = "Reset";
        startCountdown();
        show("heart1"); show("heart2"); show("heart3");
        show("box1"); show("box2"); show("box3"); show("box4");
        show("reminder");
        generateQA();
    }
}

//if we click on the answer
for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function(){
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                hide("wrongBox");
                greenBkg("correctWrong");
                show("correctBox");
                setTimeout(function(){hide("correctBox")}, 500);
                show("correctIcon");
                setTimeout(function(){purpleBkg("correctWrong")}, 500);
                setTimeout(function(){hide("correctIcon")}, 500);
                generateQA();
            }
            else {
                hide("correctBox");
                hide("correctIcon");
                redBkg("correctWrong");
                setTimeout(function(){purpleBkg("correctWrong")}, 500);
                show("wrongBox");
                setTimeout(function(){hide("wrongBox")}, 500);
                show("wrongIcon");
                setTimeout(function(){hide("wrongIcon")}, 500);

                //life heart
                heart--;
                    if (heart == 2) {
                        hide("heart3");
                    }
                    else if (heart == 1) {
                            hide("heart2");
                    }
                    else if (heart == 0) {
                            gameOver();
                            show("youLost"); hide("noTime");
            }
        }
    }
}



//==================================
//                  FUNCTIONS
//==================================

//===== Button Close =====
document.getElementById("close").onclick = function(){
    hide("gameOverBox");
    location.reload();
}

//===== Game Over =====
function gameOver(){
    hide("heart1"); hide("heart2"); hide("heart3");
    stopCountdown();
    show("gameOverBox");
    document.getElementById("gameOverScore").innerHTML = score;
    hide("infoboxes");
    hide("content");
    hide("startReset");
}

//===== Start the counter =====
function startCountdown(){
    action = setInterval(function(){
            timeRemaining -= 1;
            document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

                //===== Check if there is time remain =====
                if(timeRemaining == 0){
                    gameOver();
                    show("noTime"); hide("youLost");
        }
        //===== switch time remaining to red after 10sec left =====
        if (timeRemaining < 10) {
            redBkg("timeRemaining");
        }
    }, 1000);
}

//===== Stop Countdown =====
function stopCountdown(){
    clearInterval(action);
}

//===== Hide Element =====
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//===== Show Element =====
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//===== Change background to green =====
function greenBkg(Id){
    document.getElementById(Id).style.backgroundColor = "#008000";
}

//===== Change background to red =====
function redBkg(Id){
    document.getElementById(Id).style.backgroundColor = "#FF3669";
}

//===== Change background to purple =====
function purpleBkg(Id){
    document.getElementById(Id).style.backgroundColor = "#d497ff";
}

//===== Generate a question and multiple answers =====
function generateQA(){
    var x = 1 + Math.round(11*Math.random());
    var y = 1 + Math.round(11*Math.random());
    correctAnswer = x * y;
    document.getElementById("displayQuestion").innerHTML = x + "x" + y;
    document.getElementById("displayQuestion").style.letterSpacing = "20px";
    document.getElementById("displayQuestion").style.fontSize = "45px";
    document.getElementById("displayQuestion").style.fontFamily  = "cursive";

var correctPosition = 1+ Math.round(3*Math.random());
//===== Fill one box with the correct answer =====
document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

//===== Fill other boxes with wrong answer =====
var answers = [correctAnswer];
for (var i = 1; i < 5; i++) {
    if (i!= correctPosition){
        var wrongAnswer;
        do{
            wrongAnswer = (1 + Math.round(11*Math.random()))*(1 + Math.round(11*Math.random()));
        }
        while (answers.indexOf(wrongAnswer)>-1);
        document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            }
        }
    }
}

//==================================
//                  END!
//==================================
