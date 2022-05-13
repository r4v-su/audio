//menu buttons
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resumeButton = document.querySelector('.resume');

//sliders
const volume = document.getElementById('volume');
const panner = document.getElementById('panner');

//audio
const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
const waveShape = oscillator.type;
const gain = audioCtx.createGain();

//diplay
const displayHz = document.querySelector('.displayHz');
displayHz.innerHTML = panner.value + 'Hz'
const displayShape = document.querySelector('.displayShape');
displayShape.innerHTML = waveShape;
const flag = true;

//magic
gain.gain.value = volume.value; //gain gets volume from slider
oscillator.connect(gain);
gain.connect(audioCtx.destination);

const increment = function () {
    if (oscillator.frequency.value < 1000 && flag == true) {
        oscillator.frequency.value += 20;
        displayHz.innerHTML = oscillator.frequency.value + 'Hz'
    } else if (flag == true) {
        setTimeout(pauseAudio, 2000)
        flag = false;
    }
}
const stopAudio = () => {
    flag = false;
    clearInterval(startAudio);
}
const startAudio = () => {
    document.querySelector('.start').style.display = 'none';
    oscillator.start();
    setInterval(increment, 100)
}
const pauseAudio = () => {
        clearTimeout(increment);
        audioCtx.suspend();
        flag = false;

    },
    resumeAudio = () => {
        if (flag == false) {
            audioCtx.resume();
            flag = true;
        } else {
            audioCtx.resume();
            flag = false;
        }


    }

//buttonsActions
startButton.addEventListener('click', startAudio);
stopButton.addEventListener('click', pauseAudio);
resumeButton.addEventListener('click', resumeAudio);
//shapeMenuActions
document.querySelectorAll("div.shapeMenu form input[name='shape']").forEach(element => {
        element.addEventListener('input', function () {
            oscillator.type = element.value;
            displayShape.innerHTML = oscillator.type
        })
    }

);
//slidersActions
volume.addEventListener('input', function () {
    gain.gain.value = this.value; //refresh value after input
});
panner.addEventListener('input', function () {
    oscillator.frequency.value = this.value;
    displayHz.innerHTML = this.value + 'Hz'; //refresh value after input
});
window.addEventListener('keyown', function a(e) {
    if (e.keyCode == 32 && flag == false) {
        resumeAudio();
        flag = true;
    } else if (e.keyCode == 32 && flag == true) {
        pauseAudio();
        flag = false;
    }
});
document.addEventListener("DOMContentLoaded", startAudio());
''
window.addEventListener('keydown', function b(e) {
    console.log(e.keyCode)
})