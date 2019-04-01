"use strict";

var textInput = document.getElementById("input");
var btn = document.getElementById("btn");
var textOutput = document.getElementById("output");
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

var output = function output() {
  var inputArray = textInput.value.toLowerCase().split("");
  var outputArray = [];

  for (var i = 0; i < inputArray.length; i++) {
    outputArray.push(morseAlphabet[inputArray[i]]);
  }

  textOutput.innerHTML = outputArray.join(' ');
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