let timer;
let isRunning = false;
let isPaused = false;
let startTime;
let lapCount = 1;
let lapStartTime;

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    if (isPaused) {
      startTime = Date.now() - (lapCount - 1) * (lapStartTime ? Date.now() - lapStartTime : 1000);
      isPaused = false;
    } else {
      startTime = Date.now() - (lapCount > 1 ? lapCount - 1 : 0) * 1000;
    }
    lapStartTime = Date.now();
    timer = setInterval(updateDisplay, 1000);
    document.getElementById('pause').style.display = 'inline-block';
    document.getElementById('resume').style.display = 'none';
  }
}

function pauseTimer() {
  isRunning = false;
  isPaused = true;
  clearInterval(timer);
  document.getElementById('pause').style.display = 'none';
  document.getElementById('resume').style.display = 'inline-block';
}
function resumeTimer() {
    if (isPaused) {
      isRunning = true;
      isPaused = false;
      const currentTime = Date.now();
      startTime += currentTime - pauseTime;
      lapStartTime += currentTime - pauseTime;
      timer = setInterval(updateDisplay, 1000);
      document.getElementById('pause').style.display = 'inline-block';
      document.getElementById('resume').style.display = 'none';
    }
  }
  function pauseTimer() {
    if (isRunning) {
      isRunning = false;
      isPaused = true;
      clearInterval(timer);
      pauseTime = Date.now();
      document.getElementById('pause').style.display = 'none';
      document.getElementById('resume').style.display = 'inline-block';
    }
  }
  function resetTimer() {
    isRunning = false;
    isPaused = false;
    clearInterval(timer);
    lapCount = 1;
    startTime = 0;
    lapStartTime = 0;
    pauseTime = 0;
    document.getElementById('display').innerText = '00:00:00';
    document.getElementById('laps').innerHTML = '';
    document.getElementById('pause').style.display = 'inline-block';
    document.getElementById('resume').style.display = 'none';
  }
  

function lapTime() {
  if (isRunning) {
    const currentTime = new Date(Date.now() - startTime);
    const formattedTime = currentTime.toISOString().substr(11, 8);
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lapCount}: ${formattedTime}`;
    document.getElementById('laps').appendChild(lapItem);
    lapCount++;
    lapStartTime = Date.now();
  }
}

function resetLap() {
  lapCount = 1;
  lapStartTime = null;
  document.getElementById('laps').innerHTML = '';
}

function updateDisplay() {
  const currentTime = new Date(Date.now() - startTime);
  const formattedTime = currentTime.toISOString().substr(11, 8);
  document.getElementById('display').innerText = formattedTime;
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('resume').addEventListener('click', resumeTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTime);
document.getElementById('resetLap').addEventListener('click', resetLap);
