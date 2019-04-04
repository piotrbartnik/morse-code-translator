const textInput = document.getElementById("input");
const btn = document.getElementById("btn");
const btnPlay = document.getElementById("btnPlay");
const textOutput = document.getElementById("output");

let a = new AudioContext()

let sound = (vol, freq, duration) => {
  let v = a.createOscillator()
  let u = a.createGain()
  v.connect(u)
  v.frequency.value = freq
  v.type = "square"
  u.connect(a.destination)
  u.gain.value = vol * 0.01
  v.start(a.currentTime)
  v.stop(a.currentTime + duration * 0.001)
}

const morseAlphabet = {
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

const type = (text, time) => {
  for (let i = 0; i < text.length; i++) {
    let j = i;
    setTimeout(
      ((x) => {
        return () => {
          textInput.placeholder += text.charAt(i);
        };
      })(i),
      time * i
    );
  }
}

type("Type text to translate here", 100);

// textInput.addEventListener("click", function () {
//   textInput.value = ""
// });

textInput.addEventListener("keyup", () => {
  textInput.style.height = "5px";
  textInput.style.height = textInput.scrollHeight + "px";
});

const output = () => {
  let inputArray = textInput.value.toLowerCase().split("");
  let outputArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    outputArray.push(morseAlphabet[inputArray[i]])
  }
  textOutput.innerHTML = outputArray.join(' ')
  if (textInput.value) {
    document.querySelector("#btnPlay").style.display = 'block'
  }
}

textInput.addEventListener("keydown", () => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});

document.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    btn.click();
  }
});

btn.addEventListener('click', output);