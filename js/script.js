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
let singlePlayerBodyTableElement = document.querySelector(
  "#singlePlayerBodyTable"
);
let multiPlayerBodyTableElement = document.querySelector(
  "#multiPlayerBodyTable"
);

function toggleMultiplayerModeDropdown() {
  let multiplayerElement = document.querySelectorAll(".multiplayer");
  multiplayerElement.forEach((e) => {
    e.classList.toggle("dropdown-hide");
  });
}

function showAskNameModal() {
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
                  <label for="playerNameInput${i}" class="col-form-label">Player ${
      i + 1
    }:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="playerNameInput${i}"
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
    let playerNameValue = document.querySelector(`#playerNameInput${i}`).value;
    if (playerNameValue === "") {
      document.querySelector(
        `label[for="playerNameInput${i}"]`
      ).innerHTML = `Player ${i + 1}: <red>*required</red>`;
      document.querySelector(`#playerNameInput${i}`).style.borderColor =
        "#bb2d3b";
      check = false;
    }
  }
  if (check) {
    for (let i = 0; i <= playerCount; i++) {
      let playerNameValue = document.querySelector(
        `#playerNameInput${i}`
      ).value;
      playerName.push(playerNameValue);
    }
    for (let i = 0; i <= playerCount; i++) {
      document.querySelector(`#playerNameDiv${i}`).innerHTML = `<h3>Player ${
        i + 1
      }: ${playerName[i]}</h3>`;
      document.querySelector(`#score${i}`).innerHTML = `<h3>Score: 0</h3>`;
    }
    document.querySelector("#askNameModalBtn").outerHTML = "";
    let askNameModalElement = document.querySelector("#askNameModal");
    let modal = bootstrap.Modal.getInstance(askNameModalElement);
    modal.hide();
    document.querySelector("#askNameModal").outerHTML = "";
    timer();
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
  let htmlStr = `<div class="container text-center">
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
          <div id="playerNameDiv${i}" class="col"></div>
          <div id="score${i}" class="col"></div>
        </div>
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
  timerInterval = setInterval(() => {
    let htmlStr = "";
    timeLeft -= 1000;
    if (timeLeft % 60000 === 0) {
      second = 1;
    }
    second -= 1;
    if (timeLeft === -1000) {
      showFinishGameModal("Time's up!");
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
      document.querySelector(".time").innerHTML = htmlStr;
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
  showAskNameModal();
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
        showFinishGameModal("Congratulation!");
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
        showFinishGameModal("You released the rocket!");
      }, 5500);
    }
  }
  document.querySelector(
    `#score${i}`
  ).innerHTML = `<h3>Score: ${score[i]}</h3>`;
  alphabetElement.disabled = true;
}

function showFinishGameModal(str) {
  clearInterval(timerInterval);
  setKeyboardDisable(true);
  let htmlStr = `<button
                  type="button"
                  id="finishGameModalBtn"
                  class="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#finishGameModal"
                ></button>
                <div
                  class="modal fade"
                  id="finishGameModal"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5">${str}</h1>
                      </div>
                      <div class="modal-body">`;
  for (let i = 0; i <= playerCount; i++) {
    score[i] += timeLeft;
    document.querySelector(
      `#score${i}`
    ).innerHTML = `<h3>Score: ${score[i]}</h3>`;
    htmlStr += `<div>Player ${i + 1}: <mark>${playerName[i]}</mark></div>
                <div>&emsp;&emsp;Your word: <mark>${
                  wordUpperCase[i]
                }</mark></div>
                <div>&emsp;&emsp;Your score: <mark>${score[i]}</mark></div>`;
  }
  htmlStr += `</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  onclick="submitScore('new game')"
                >
                  New Game
                </button>
                <button type="button" class="btn btn-primary" onclick="submitScore()">
                  Yeah!
                </button>
              </div>
            </div>
          </div>
        </div>`;
  document.body.insertAdjacentHTML("afterbegin", htmlStr);
  document.querySelector("#finishGameModalBtn").click();
}

function submitScore(str) {
  localStorage.setItem(JSON.stringify(playerName), JSON.stringify(score));
  if (str === "new game") {
    playerName = [];
    stageImg = [];
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
      let rocketImgElement = document.querySelector(`#rocket${i}`);
      rocketImgElement.style.animation = "";
      rocketImgElement.src = "/img/spaceship/none.png";
      document.querySelector(`#playerNameDiv${i}`).innerHTML = `<h3>Player ${
        i + 1
      }:</h3>`;
      document.querySelector(`#score${i}`).innerHTML = `<h3>Score: 0</h3>`;
    }
    wordLowerCase = [];
    guessWord = [];
    wordUpperCase = [];
    score = [];
    timeLeft = timeLeft1;
    minute = minute1;
    second = second1;
    document.querySelector(".time").innerHTML = "<h1>Time Left: 5:00</h1>";
    document.body.style.backgroundImage =
      "linear-gradient(to top right, rgb(17, 64, 151), rgb(248, 172, 199))";
    document.querySelector("#finishGameModalBtn").outerHTML = "";
    let finishGameModalElement = document.querySelector("#finishGameModal");
    let modal = bootstrap.Modal.getInstance(finishGameModalElement);
    modal.hide();
    finishGameModalElement.outerHTML = "";
    startGame();
  } else {
    window.location.href = "scoreboard.html";
  }
}
