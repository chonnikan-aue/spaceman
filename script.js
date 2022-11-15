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
let askNameModalElement = document.querySelector("#askNameModal");
let askNameModalTitleElement = document.querySelector("#askNameModalTitle");
let askNameModalBtn = document.querySelector("#askNameModalBtn");
let askNameModalWordElement = document.querySelector("#askNameModalWord");
let askNameModalScoreElement = document.querySelector("#askNameModalScore");
let rocketImgElement = document.querySelector("#rocket");
let goBackModalBtn = document.querySelector("#goBackModalBtn");

alphabet.forEach((a) => {
  keyboardElement.innerHTML += `<button type="button" class="col-2 btn btn-danger btn-lg" id="${a}" onclick="chooseAlphabet(this.id)">${a}</button>`;
});

startGame();

// axios({
//   method: "get",
//   url: "https://wordsapiv1.p.mashape.com/words?random=true",
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

function goBack() {
  goBackModalBtn.click()
}

function startGame() {
  setKeyboardDisable(false);
  randomWord();
}

function resetGame() {
  stageImg = [
    "body",
    "head",
    "window",
    "wing1",
    "wing2",
    "wing3",
    "nozzle",
    "fire",
  ];
  score = 0;
  document.body.style.backgroundImage = "url(img/earth.jpg)";
  rocketImgElement.style.animation = "";
  hideModal();
  startGame();
}

function hideModal() {
  let modal = bootstrap.Modal.getInstance(askNameModalElement);
  modal.hide();
}

function setKeyboardDisable(bool) {
  alphabet.forEach((a) => {
    document.querySelector(`#${a}`).disabled = bool;
  });
}

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
    rocketImgElement.src = `img/spaceship/${stageImg.shift()}.png`;
    score -= 5;
    if (stageImg.length === 0) {
      setKeyboardDisable(true);
      document.body.style.backgroundImage = "url(img/bg/space.gif)";
      rocketImgElement.style.animation = "rocket 5s";
      setTimeout(() => {
        modifyModal("lose");
      }, 5500);
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
