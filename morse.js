const textInput = document.getElementById("input");
const btn = document.getElementById("btn");
const textOutput = document.getElementById("output");

const morseAlphabet = { " ": "/", "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..", ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--", "-": "-....-", "/": "-..-.", "@": ".--.-.", "(": "-.--.", ")": "-.--.-" };

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