var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

// Main bit
$(document).keypress(function (event) {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    animateClick(userChosenColour);
    checkAnswer(userPattern.length - 1);
});

// Functions that will be called
function startOver() {
    level = [];
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        playSound(userPattern[currentLevel]);

        if (userPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1500);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 500);
        $("#level-title").text("Game over, press any key to restart");
        startOver();
    }
}

function nextSequence() {
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    animateClick(randomChosenColour);
    playSound(randomChosenColour);

    return randomChosenColour;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animateClick(colour) {
    var element = $("#" + colour);

    element.addClass("pressed");

    setTimeout(function () {
        element.removeClass("pressed");
    }, 200);
}