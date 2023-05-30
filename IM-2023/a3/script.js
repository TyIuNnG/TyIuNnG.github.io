let speed = 0;
let slowInt;
let isGameRunning = false;
let noSpeed;
let notYet;

// The increaseSpeed function will operate everytime a click happens and increase the speed count by 1, 
// send it back to the speed-metre and update the speed of wheel animation and fog opacity
function increaseSpeed() {
    speed += 1;
    document.getElementById("speed-metre").textContent = speed;
    updateWheelSpeed();
    console.log("speed increased", speed);
    updateFog();
}

// The decreaseSpeed function will operate every setInterval determined by the current speed-metre value and remove 1 from the speed count, 
// send it back to the speed-metre and update the speed of wheel animation and fog opacity
// Once the speed count reaches 0, the wheel animation will be set to 0.1s duration to avoid 0.1/0 = undefined
// speed = 0 will also clear the setInterval that triggers the decreaseSpeed function and stop the animation after 1 second, if speed is still equal to 0 at that time
function decreaseSpeed() {
    if (speed > 0) {
        speed -= 1;
        document.getElementById("speed-metre").textContent = speed;
        console.log("speed decreased", speed);
        updateFog();
        if (speed > 0) {
            updateWheelSpeed();
        } else {
            document.getElementById("front-wheel").style.animationDuration = `0.1s`;
            document.getElementById("back-wheel").style.animationDuration = `0.1s`;
        }
    }

    if (speed === 0) {
        clearInterval(slowInt);
        noSpeed = setTimeout(() => {
            if (speed === 0) {
                document.getElementById("front-wheel").style.animationDuration = `0s`;
                document.getElementById("back-wheel").style.animationDuration = `0s`;
                console.log("stopped");
            }
        }, 1000);
    }
}

// The startGame function hides the tip-text on first click and also manages the speed of the wheel spin
// It also triggers increaseSpeed and cancel the timeout in the decreaseSpeed function when speed = 0
function startGame() {
    document.getElementById("tip-text").hidden = true;
    clearTimeout(notYet);
    if (speed > 60) {
        clearInterval(slowInt);
        slowInt = setInterval(decreaseSpeed, 50);
    } else if (speed > 40) {
        clearInterval(slowInt);
        slowInt = setInterval(decreaseSpeed, 75);
    } else if (speed > 20) {
        clearInterval(slowInt);
        slowInt = setInterval(decreaseSpeed, 100);
    } else {
        clearInterval(slowInt);
        slowInt = setInterval(decreaseSpeed, 125);
        notYet = setTimeout(() => {
            clearInterval(slowInt);
            slowInt = setInterval(decreaseSpeed, 100);
        }, 1000);
    }
    increaseSpeed();
    clearTimeout(noSpeed);
}

// When click, it triggers startGame
document.addEventListener('DOMContentLoaded', function() {
    const clickBike = document.getElementById("clickBike");
    clickBike.addEventListener("click", startGame);
})

// When mousedown, it changes the stick figure to red
document.addEventListener('DOMContentLoaded', function() {
    const clickBike = document.getElementById("clickBike");
    clickBike.addEventListener("mousedown", function () {
        clickBike.src = "image/dynamic.svg";
    });
})

// When mouseup, it changes the stick figure back to orange
document.addEventListener('DOMContentLoaded', function() {
    const clickBike = document.getElementById("clickBike");
    const soundPlay = document.getElementById("sound");
    clickBike.addEventListener("mouseup", function () {
        clickBike.src = "image/static.svg";
    });
})
// Quick note that the eventlistners above is written this way because declaring const outside keeps having error, therefore this solution is applied

// This updateWheelSpeed is triggered from increaseSpeed and decreaseSpeed to calculate the speed of the wheel by 0.1 / speed
// when speed = 0, animationSpeed = 0, therefore in decrease speed, the animationDuration is 0.1s, which is the same result as 0.1 / 1 (speed = 1)
function updateWheelSpeed() {
    const speed = parseInt(document.getElementById("speed-metre").textContent);
    const animationSpeed = 0.1 / speed;
    document.getElementById("front-wheel").style.animationDuration = `${animationSpeed}s`;
    document.getElementById("back-wheel").style.animationDuration = `${animationSpeed}s`;
    console.log("Wheel Speed", document.getElementById("front-wheel").style.animationDuration);
}

// updateFog controls the opacity of the white div that is between the bicycle and the background
function updateFog() {
    const bgOpacity = 1 - (speed / 40);
    // Opacity is between 0 to 1, therefore 1 - (speed / 40) make sure that the opacity is 1 at lowest speed and opacity is 0 at speed = 40
    // Any speed above 40 will still be opacity = 0
    document.getElementById("mask").style.opacity = bgOpacity;
    document.getElementById("title").style.opacity = bgOpacity;
    // this is a later built-in that also set the opacity of the title, so that it fades away while the background fades in and vice versa
}

// Instead of setting display to "none" in CSS, there is an issue that it doesn't get's determined as === to "none" in the function displayArticke() under this
// Therefore setting it to "none" in javascript once the page is loaded can solve the issue
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("article").style.display = "none";
});

// This function calls out the 500 words paragraph that explains the design choices of this simulator
// Also creates white background that helps the text to been seen easier when the background is running
// Also it can hide as well after the texts are visible
function displayArticle() {
    if (document.getElementById("article").style.display === "none") {
        document.getElementById("article").style.display = "block";
        document.getElementById("display-button").textContent = "Hide information";
        document.querySelector(".words-display").style.backgroundColor = "white";
        console.log("show");
    } else {
        document.getElementById("article").style.display = "none";
        document.getElementById("display-button").textContent = "About this design";
        document.querySelector(".words-display").style.backgroundColor = "transparent";
        console.log("hide");
    }
}