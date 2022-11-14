const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let keyboardElement = document.querySelector(".keyboard");
let vocab = [
  "abandon",
  "abandoned",
  "ability",
  "able",
  "about",
  "above",
  "abroad",
  "absence",
];
let chosenWord = "";
let guessWord = [];
let stageImg = [
  "body",
  "head",
  "window",
  "wing1",
  "wing2",
  "wing3",
  "nozzle",
  "fire",
];

alphabet.forEach((a) => {
  keyboardElement.innerHTML += `<button type="button" class="col btn btn-outline-dark btn-lg" id="${a}" onclick="chooseAlphabet(this.id)">${a}</button>`;
});

function randomWord() {
  let randomNum = Math.floor(Math.random() * vocab.length);
  chosenWord = vocab[randomNum];
  console.log(chosenWord);
  guessWord = Array(chosenWord.length).fill("_");
  console.log(guessWord);
  changeDisplayWord();
}

function changeDisplayWord() {
  let wordElement = document.querySelector(".word");
  let wordStr = "";
  guessWord.forEach((a) => {
    wordStr += `${a} `;
  });
  wordElement.innerHTML = `<h1>${wordStr}</h1>`;
}

function chooseAlphabet(id) {
  let alphabetElement = document.querySelector(`#${id}`);
  let chosenAlphabet = alphabetElement.innerText.toLowerCase();
  let indexOfChosenWord = chosenWord.indexOf(chosenAlphabet);
  if (indexOfChosenWord !== -1) {
    while (indexOfChosenWord !== -1) {
      guessWord[indexOfChosenWord] = alphabetElement.innerText;
      changeDisplayWord();
      chosenWord = chosenWord.replace(chosenAlphabet, "_");
      indexOfChosenWord = chosenWord.indexOf(chosenAlphabet);
    }
  } else {
    let spaceshipElement = document.querySelector(".spaceship > img");
    spaceshipElement.src = `img/spaceship-${stageImg.shift()}.png`;
  }
  alphabetElement.disabled = true;
  console.log(guessWord);
}

randomWord();
