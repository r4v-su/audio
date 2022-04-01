//menu buttons
var startButton = document.querySelector('.start');
var stopButton = document.querySelector('.stop');
var resumeButton = document.querySelector('.resume');

//sliders
var volume = document.getElementById('volume');
var panner = document.getElementById('panner');

//audio
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();
var waveShape = oscillator.type;
var gain = audioCtx.createGain();

//diplay
var displayHz = document.querySelector('.displayHz');
displayHz.innerHTML = panner.value + 'Hz'
var displayShape = document.querySelector('.displayShape');
displayShape.innerHTML = waveShape;
var flag = true;

//magic
gain.gain.value = volume.value; //gain gets volume from slider
oscillator.connect(gain);
gain.connect(audioCtx.destination);

var increment = function () {
    if(oscillator.frequency.value < 1000 && flag == true)
    {
    oscillator.frequency.value += 20;
    displayHz.innerHTML = oscillator.frequency.value + 'Hz'}
    else if (flag == true){
       setTimeout(pauseAudio, 2000)
        flag = false;
    }
}
var stopAudio = () => {
    flag = false;
    clearInterval(startAudio);
}
var startAudio = () => {
    document.querySelector('.start').style.display = 'none';
    oscillator.start();
    setInterval(increment, 100)    
}
var pauseAudio = () => {
    clearTimeout(increment);
    audioCtx.suspend();
    flag = false;

}

//buttonsActions
startButton.addEventListener('click', startAudio);
stopButton.addEventListener('click', pauseAudio);   
resumeButton.addEventListener('click', function () { audioCtx.resume();
    flag = true;
})

//shapeMenuActions
document.querySelectorAll("div.shapeMenu form input[name='shape']").forEach(element => {
element.addEventListener('input', function() {
    oscillator.type = element.value;
    displayShape.innerHTML = oscillator.type
}
    ) 
}

);
//slidersActions
volume.addEventListener('input', function() {
    gain.gain.value = this.value; //refresh value after input
});
panner.addEventListener('input', function () {
        oscillator.frequency.value = this.value;
        displayHz.innerHTML = this.value + 'Hz'; //refresh value after input
});

document.addEventListener("DOMContentLoaded", startAudio());''