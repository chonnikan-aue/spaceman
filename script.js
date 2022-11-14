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
let word = "";
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
let score = 0;
let askNameModalTitleElement = document.querySelector("#askNameModalTitle");
let askNameModalBtn = document.querySelector("#askNameModalBtn");
let askNameModalWordElement = document.querySelector("#askNameModalWord");
let askNameModalScoreElement = document.querySelector("#askNameModalScore");

alphabet.forEach((a) => {
  keyboardElement.innerHTML += `<button type="button" class="col-2 btn btn-danger btn-lg" id="${a}" onclick="chooseAlphabet(this.id)">${a}</button>`;
});

function randomWord() {
  let randomNum = Math.floor(Math.random() * vocab.length);
  chosenWord = vocab[randomNum];
  word = chosenWord.toUpperCase();
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
      score += 10;
      indexOfChosenWord = chosenWord.indexOf(chosenAlphabet);
    }
    setTimeout(() => {
      if (guessWord.join("").indexOf("_") === -1) {
        modifyModal("win");
      }
    }, 0);
  } else {
    let spaceshipElement = document.querySelector(".spaceship > img");
    spaceshipElement.src = `img/spaceship-${stageImg.shift()}.png`;
    score -= 5;
    if (stageImg.length === 0) {
      modifyModal("lose");
    }
  }
  alphabetElement.disabled = true;
  console.log(guessWord);
}

function modifyModal(str) {
  if (str === "win") {
    askNameModalTitleElement.innerText = "Congratulation!";
  } else {
    askNameModalTitleElement.innerText = "You released the rocket!";
  }
  askNameModalWordElement.innerHTML = `Your word is <mark>${word}</mark>`;
  askNameModalScoreElement.innerHTML = `Score: <mark>${score}</mark>`;
  askNameModalBtn.click();
}

randomWord();
