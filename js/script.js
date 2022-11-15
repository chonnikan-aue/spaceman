const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let keyboardElement = document.querySelector(".keyboard");
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
let colorBootstrap = ["primary", "secondary", "success", "info"];
let score = 0;
let link = window.location.href;
let askNameModalElement = document.querySelector("#askNameModal");
let askNameModalTitleElement = document.querySelector("#askNameModalTitle");
let askNameModalBtn = document.querySelector("#askNameModalBtn");
let askNameModalWordElement = document.querySelector("#askNameModalWord");
let askNameModalScoreElement = document.querySelector("#askNameModalScore");
let rocketImgElement = document.querySelector("#rocket");
let goBackModalBtn = document.querySelector("#goBackModalBtn");
let labelPlayerNameElement = document.querySelector("label[for='playerName']");
let playerNameElement = document.querySelector("#playerName");
let bodyTableElement = document.querySelector("#bodyTable");

if (link.indexOf("single") !== -1) {
  alphabet.forEach((a) => {
    keyboardElement.innerHTML += `<button type="button" class="col-2 btn btn-danger btn-lg" id="${a}" onclick="chooseAlphabet(this.id)">${a}</button>`;
  });
  startGame();
} else if (link.indexOf("scoreboard") !== -1) {
  let localStorageSort = Object.keys(localStorage).sort(
    (a, b) => localStorage[b] - localStorage[a]
  );
  localStorageSort.forEach((key, index) => {
    let colorIndex = index;
    if (index >= colorBootstrap.length) {
      colorIndex = index % colorBootstrap.length;
    }
    bodyTableElement.innerHTML += `<tr class="table-${
      colorBootstrap[colorIndex]
    }"><th scope="row">${
      index + 1
    }</th><td>${key}</td><td>${localStorage.getItem(key)}</td></tr>`;
  });
}

function goBack() {
  goBackModalBtn.click();
}

function startGame() {
  setKeyboardDisable(false);
  randomWord();
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
  axios({
    method: "get",
    url: "https://random-word-api.herokuapp.com/word",
  })
    .then((res) => {
      chosenWord = res.data[0];
      word = chosenWord.toUpperCase();
      console.log(chosenWord);
      guessWord = Array(chosenWord.length).fill("_");
      changeDisplayWord();
    })
    .catch((err) => {
      console.log(err);
    });
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
      document.body.style.backgroundImage = "url(/img/bg/space.gif)";
      rocketImgElement.style.animation = "rocket 5s";
      setTimeout(() => {
        modifyModal("lose");
      }, 5500);
    }
  }
  alphabetElement.disabled = true;
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

function submit(str) {
  if (playerNameElement.value !== "") {
    localStorage.setItem(playerName.value, score);
    document.querySelector("#playerName").value = "";
    if (str === "new game") {
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
      document.body.style.backgroundImage = "url(img/bg/earth.jpg)";
      rocketImgElement.style.animation = "";
      rocketImgElement.src = "/img/spaceship/none.png";
      hideModal();
      startGame();
      labelPlayerNameElement.innerHTML = "Enter your name:";
      playerNameElement.style.borderColor = "#ced4da";
    } else {
      window.location.href = "scoreboard.html";
    }
  } else {
    labelPlayerNameElement.innerHTML = "Enter your name: <red>*required</red>";
    playerNameElement.style.borderColor = "#bb2d3b";
  }
}
