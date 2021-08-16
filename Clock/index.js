function getCurrentTime() {
    let now = new Date();
    let time = now.toTimeString().split(' ')[0];
    return time
}

function updateClock() {
    document.getElementById('clock');
    clock.innerText = getCurrentTime();
}

setInterval(updateClock, 1000);