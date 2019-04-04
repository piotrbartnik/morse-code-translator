"use strict";

var textInput = document.getElementById("input");
var btn = document.getElementById("btn");
var btnPlay = document.getElementById("btnPlay");
var textOutput = document.getElementById("output");
var a = new AudioContext();

var sound = function sound(vol, freq, duration) {
  var v = a.createOscillator();
  var u = a.createGain();
  v.connect(u);
  v.frequency.value = freq;
  v.type = "square";
  u.connect(a.destination);
  u.gain.value = vol * 0.01;
  v.start(a.currentTime);
  v.stop(a.currentTime + duration * 0.001);
};

var morseAlphabet = {
  " ": "/",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
};

var type = function type(text, time) {
  var _loop = function _loop(i) {
    var j = i;
    setTimeout(function (x) {
      return function () {
        textInput.placeholder += text.charAt(i);
      };
    }(i), time * i);
  };

  for (var i = 0; i < text.length; i++) {
    _loop(i);
  }
};

type("Type text to translate here", 100); // textInput.addEventListener("click", function () {
//   textInput.value = ""
// });

textInput.addEventListener("keyup", function () {
  textInput.style.height = "5px";
  textInput.style.height = textInput.scrollHeight + "px";
});
var outputArray = [];

var output = function output() {
  var inputArray = textInput.value.toLowerCase().split("");

  for (var i = 0; i < inputArray.length; i++) {
    outputArray.push(morseAlphabet[inputArray[i]]);
  }

  textOutput.innerHTML = outputArray.join(' ');

  if (textInput.value) {
    document.querySelector("#btnPlay").style.display = 'block';
  }
};

textInput.addEventListener("keydown", function () {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});
document.addEventListener("keyup", function (event) {
  event.preventDefault();

  if (event.keyCode === 13) {
    btn.click();
  }
});
btn.addEventListener('click', output);
btnPlay.addEventListener('click', function () {
  outputArray = outputArray.join('');
  console.log(outputArray);

  for (var i = 0; i < outputArray.length; i++) {
    var time = 0;

    if (outputArray[i] === '.') {
      console.log(outputArray[i]);
      window.setTimeout(function () {
        sound(100, 440, 300);
      }, time);
      time += 300;
      console.log(time);
    } else {
      window.setTimeout(function () {
        sound(100, 540, 400);
      }, time);
      time += 400;
      console.log(time);
    }
  }
});