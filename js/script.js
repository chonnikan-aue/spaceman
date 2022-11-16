const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const minute1 = 4;
const second1 = 60;
const timeLeft1 = minute1 * 60000 + second1 * 1000;
let link = window.location.href;
let playerCount = parseInt(link.split("player=")[1]) - 1;
let wordLowerCase = []; // ["", ""]
let guessWord = []; // [[], []]
let wordUpperCase = []; // ["", ""]
let stageImg = [];
for (let i = 0; i <= playerCount; i++) {
  stageImg.push([
    "body",
    "head",
    "window",
    "wing1",
    "wing2",
    "wing3",
    "nozzle",
    "fire",
  ]);
}
let colorBootstrap = ["primary", "secondary", "success", "info"];
let score = [];
let playerName = [];
let minute = minute1;
let second = second1;
let timeLeft = timeLeft1;
let timerInterval;
let finishGameModalElement = document.querySelector("#finishGameModal");
let finishGameModalTitleElement = document.querySelector(
  "#finishGameModalTitle"
);
let finishGameModalBtn = document.querySelector("#finishGameModalBtn");
let finishGameModalWordElement = document.querySelector("#finishGameModalWord");
let finishGameModalScoreElement = document.querySelector(
  "#finishGameModalScore"
);
let bodyTableElement = document.querySelector("#bodyTable");

if (link.indexOf("game") !== -1) {
  addGameWindow();
  addGoBackModal();
  addKeyboard();
  startGame();
  addAskNameModal();
} else if (link.indexOf("single") !== -1) {
  addGoBackModal();
  addKeyboard();
  timer();
  startGame();
} else if (link.indexOf("twoplayer") !== -1) {
  playerCount = 1;
  addKeyboard();
  addGoBackModal();
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

function addAskNameModal() {
  let htmlStr = `<button
      type="button"
      id="askNameModalBtn"
      class="btn"
      data-bs-toggle="modal"
      data-bs-target="#askNameModal"
    ></button>

    <div
      class="modal fade"
      id="askNameModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="askNameModalTitle" class="modal-title fs-5">
              Enter your name
            </h1>
          </div>
          <div class="modal-body">`;
  for (let i = 0; i <= playerCount; i++) {
    htmlStr += `<div class="mb-3">
                  <label for="playerName${i}" class="col-form-label">Player ${
      i + 1
    }:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="playerName${i}"
                    required
                  />
                </div>`;
  }
  htmlStr += `</div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" onclick="submitName()">
                  Let's start!
                </button>
              </div>
            </div>
          </div>
        </div>`;
  document.body.insertAdjacentHTML("afterbegin", htmlStr);
  document.querySelector("#askNameModalBtn").click();
}

function submitName() {
  let check = true;
  for (let i = 0; i <= playerCount; i++) {
    let playerNameValue = document.querySelector(`#playerName${i}`).value;
    if (playerNameValue === "") {
      let labelPlayerNameElement = document.querySelector(
        `label[for="playerName${i}"]`
      );
      let playerNameElement = document.querySelector(`#playerName${i}`);
      labelPlayerNameElement.innerHTML = `Player ${
        i + 1
      }: <red>*required</red>`;
      playerNameElement.style.borderColor = "#bb2d3b";
      check = false;
    }
  }
  if (check) {
    for (let i = 0; i <= playerCount; i++) {
      let playerNameValue = document.querySelector(`#playerName${i}`).value;
      playerName.push(playerNameValue);
    }
    let askNameModalElement = document.querySelector("#askNameModal");
    let modal = bootstrap.Modal.getInstance(askNameModalElement);
    modal.hide();
    timer()
  }
}

function addGoBackModal() {
  let htmlStr = `<button
  type="button"
  id="goBackModalBtn"
  class="btn"
  data-bs-toggle="modal"
  data-bs-target="#goBackModal"
  ></button>
  
  <div
  class="modal fade"
  id="goBackModal"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="goBackModalTitle" class="modal-title fs-5">
          We sad to see you go...
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
          <red>** This will not save your game progress **</red>
        </div>
        <div class="modal-footer">
          <button
          type="button"
          class="btn btn-danger"
          onclick="window.location.href = 'index.html'"
          >
          Yes, I want to go.
          </button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("afterbegin", htmlStr);
}

function addGameWindow() {
  let htmlStr = `<div class="container text-center game-window">
  <div class="row">
    <nav class="nav">
      <a class="nav-link" onclick="goBack()"
      ><h1><i class="bi bi-arrow-left-circle"></i></h1
      ></a>
      <div class="time"><h1>Time Left: 5:00</h1></div>
    </nav>
  </div>
  <div class="row">`;
  for (let i = 0; i <= playerCount; i++) {
    htmlStr += `<div class="col player${i}">
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <div class="row word"></div>
          </div>
          <div class="col spaceship">
            <img id="rocket${i}" src="img/spaceship/none.png" alt="spaceship" />
          </div>
        </div>
        <div class="row keyboard"></div>
      </div>
    </div>`;
  }
  htmlStr += `</div></div>`;
  document.body.insertAdjacentHTML("afterbegin", htmlStr);
}

function addKeyboard() {
  let keyboardElement = document.querySelectorAll(".keyboard");
  for (let i = 0; i <= playerCount; i++) {
    alphabet.forEach((a) => {
      keyboardElement[
        i
      ].innerHTML += `<button type="button" class="col-2 btn btn-danger btn-lg" id="${a}${i}" onclick="chooseAlphabet(this.id)">${a}</button>`;
    });
  }
}

function timer() {
  let timeElement = document.querySelector(".time");
  timerInterval = setInterval(() => {
    let htmlStr = "";
    timeLeft -= 1000;
    if (timeLeft % 60000 === 0) {
      second = 1;
    }
    second -= 1;
    if (timeLeft === -1000) {
      modifyModal("Time's up!");
    } else {
      if (minute === 0) {
        htmlStr = `<red><h1>Time Left: ${minute}:`;
        if (second >= 10) {
          htmlStr += `${second}</h1></red>`;
        } else {
          htmlStr += `0${second}</h1></red>`;
        }
      } else {
        htmlStr = `<h1>Time Left: ${minute}:`;
        if (second >= 10) {
          htmlStr += `${second}</h1>`;
        } else {
          htmlStr += `0${second}</h1>`;
        }
      }
      timeElement.innerHTML = htmlStr;
      if (timeLeft % 60000 === 0) {
        minute -= 1;
        second = 60;
      }
    }
  }, 1000);
}

function goBack() {
  let goBackModalBtn = document.querySelector("#goBackModalBtn");
  goBackModalBtn.click();
}

function startGame() {
  setKeyboardDisable(false);
  randomWord();
}

function hideModal() {
  let modal = bootstrap.Modal.getInstance(finishGameModalElement);
  modal.hide();
}

function setKeyboardDisable(bool) {
  for (let i = 0; i <= playerCount; i++) {
    alphabet.forEach((a) => {
      document.querySelector(`#${a}${i}`).disabled = bool;
    });
  }
}

function randomWord() {
  for (let i = 0; i <= playerCount; i++) {
    axios({
      method: "get",
      url: "https://random-word-api.herokuapp.com/word",
    })
      .then((res) => {
        let word = res.data[0];
        wordLowerCase.push(word);
        wordUpperCase.push(word.toUpperCase());
        guessWord.push(Array(word.length).fill("_"));
        console.log(guessWord);
        changeDisplayWord(i);
      })
      .catch((err) => {
        console.log(err);
      });
    score.push(0);
  }
}

function changeDisplayWord(i) {
  let wordElement = document.querySelectorAll(".word");
  let wordStr = "";
  guessWord[i].forEach((a) => {
    wordStr += `${a} `;
  });
  wordElement[i].innerHTML = `<h1>${wordStr}</h1>`;
}

function chooseAlphabet(id) {
  let i = id.split("")[1];
  let alphabetElement = document.querySelector(`#${id}`);
  let chosenAlphabet = alphabetElement.innerText.toLowerCase();
  let indexOfWordLowerCase = wordLowerCase[i].indexOf(chosenAlphabet);
  if (indexOfWordLowerCase !== -1) {
    while (indexOfWordLowerCase !== -1) {
      guessWord[i][indexOfWordLowerCase] = alphabetElement.innerText;
      changeDisplayWord(i);
      wordLowerCase[i] = wordLowerCase[i].replace(chosenAlphabet, "_");
      score[i] += 5000;
      indexOfWordLowerCase = wordLowerCase[i].indexOf(chosenAlphabet);
    }
    setTimeout(() => {
      if (guessWord[i].join("").indexOf("_") === -1) {
        modifyModal("win");
      }
    }, 0);
  } else {
    let rocketImgElement = document.querySelector(`#rocket${i}`);
    rocketImgElement.src = `img/spaceship/${stageImg[i].shift()}.png`;
    score[i] -= 1000;
    if (stageImg[i].length === 0) {
      setKeyboardDisable(true);
      clearInterval(timerInterval);
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
  clearInterval(timerInterval);
  setKeyboardDisable(true);
  if (str === "win") {
    finishGameModalTitleElement.innerText = "Congratulation!";
  } else if (str === "lose") {
    finishGameModalTitleElement.innerText = "You released the rocket!";
  } else {
    finishGameModalTitleElement.innerText = str;
  }
  finishGameModalWordElement.innerHTML = `Your word is <mark>${wordUpperCase}</mark>`;
  for (let i = 0; i <= playerCount; i++) {
    score[i] += timeLeft;
  }
  finishGameModalScoreElement.innerHTML = `Score: <mark>${score}</mark>`;
  finishGameModalBtn.click();
}

function submit(str) {
  if (playerNameElement.value !== "") {
    localStorage.setItem(playerName.value, score);
    document.querySelector("#playerName").value = "";
    if (str === "new game") {
      for (let i = 0; i <= playerCount; i++) {
        stageImg.push([
          "body",
          "head",
          "window",
          "wing1",
          "wing2",
          "wing3",
          "nozzle",
          "fire",
        ]);
      }
      score = [];
      timeLeft = timeLeft1;
      minute = minute1;
      second = second1;
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
  }
}
