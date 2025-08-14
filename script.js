let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 1;

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}.${formattedMS}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        document.getElementById("display").innerHTML = timeToString(elapsedTime);
    }, 10);
    running = true;
    document.getElementById("startPauseBtn").textContent = "Pause";
    document.getElementById("lapBtn").disabled = false;
    document.getElementById("resetBtn").disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    running = false;
    document.getElementById("startPauseBtn").textContent = "Start";
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    lapCounter = 1;
    document.getElementById("display").textContent = "00:00.00";
    document.getElementById("laps").innerHTML = "";
    document.getElementById("startPauseBtn").textContent = "Start";
    document.getElementById("lapBtn").disabled = true;
    document.getElementById("resetBtn").disabled = true;
}

function lapTimer() {
    let lapTime = timeToString(elapsedTime);
    let lapItem = document.createElement("div");
    lapItem.classList.add("lap-item");
    lapItem.innerHTML = `<span>Lap ${lapCounter++}</span> <span>${lapTime}</span>`;
    document.getElementById("laps").prepend(lapItem);
}

document.getElementById("startPauseBtn").addEventListener("click", function() {
    running ? pauseTimer() : startTimer();
});

document.getElementById("resetBtn").addEventListener("click", resetTimer);

document.getElementById("lapBtn").addEventListener("click", lapTimer);
