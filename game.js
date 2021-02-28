var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var randomChosenColour;
var match;

$(document).keypress(function (event) {
    randomChosenColour = nextSequence();

});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    animateClick(userChosenColour);

    if (userChosenColour === randomChosenColour) {
        playSound(userChosenColour);
        console.log("HOORAY!");
    } else {
        playSound("wrong");
        console.log("BOO!");
    }

    console.log(userPattern);
});

function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    animateClick(randomChosenColour);
    playSound(randomChosenColour);

    console.log(randomChosenColour, level);
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