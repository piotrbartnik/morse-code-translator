"use strict";

var textInput = document.getElementById("input");
var btn = document.getElementById("btn");
var btnPlay = document.getElementById("btnPlay");
var textOutput = document.getElementById("output");
var ac = new AudioContext();

var sound = function sound(vol, freq, duration) {
  var v = ac.createOscillator();
  var u = ac.createGain();
  v.connect(u);
  v.frequency.value = freq;
  v.type = "square";
  u.connect(ac.destination);
  u.gain.value = vol * 0.01;
  v.start(ac.currentTime);
  v.stop(ac.currentTime + duration * 0.001);
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
  if (outputArray.length > 0) {
    outputArray = [];
  }

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
  var playMorseString = outputArray.join(' ');
  var soundArray = [];

  for (var _i = 0; _i < playMorseString.length; _i++) {
    if (playMorseString[_i] === '.') {
      soundArray.push([100, 440, 100]);
    } else if (playMorseString[_i] === '-') {
      soundArray.push([100, 440, 200]);
    } else {
      soundArray.push([100, 0, 200]);
    }
  }

  for (var i = 0; i < soundArray.length; i++) {
    var time = 300;
    setTimeout(function (x) {
      var j = i;
      return function () {
        sound(soundArray[j][0], soundArray[j][1], soundArray[j][2]);
      };
    }(i), time * i);
  }
});