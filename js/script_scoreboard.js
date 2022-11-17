let singlePlayerNameAndScore = []; // [[name, score], [name, score]]
let multiPlayerNameAndScore = []; // [[[name, score], [name, score]], [[name, score], [name, score], [name, score]]]

let storage = [];

Object.entries(localStorage).forEach((eachGame) => {
  let matchPlayerNameAndScore = [];
  eachGame.forEach((eachItem) => {
    matchPlayerNameAndScore.push(JSON.parse(eachItem));
  });
  storage.push(matchPlayerNameAndScore);
});

console.log(storage);

// single player

storage.forEach((eachGame) => {
  if (eachGame[0].length === 1) {
    let matchPlayerNameAndScore = [];
    matchPlayerNameAndScore.push(eachGame[0][0]);
    matchPlayerNameAndScore.push(eachGame[1][0]);
    singlePlayerNameAndScore.push(matchPlayerNameAndScore);
  }
});

let singlePlayerNameAndScoreSort = singlePlayerNameAndScore.sort(
  (a, b) => b[1] - a[1]
);

singlePlayerNameAndScoreSort.forEach((eachGame, index) => {
  let colorIndex = index;
  if (index >= colorBootstrap.length) {
    colorIndex = index % colorBootstrap.length;
  }
  singlePlayerBodyTableElement.innerHTML += `<tr class="table-${
    colorBootstrap[colorIndex]
  }"><th scope="row">${index + 1}</th><td>${eachGame[0]}</td><td>${
    eachGame[1]
  }</td></tr>`;
});

console.log("sing", singlePlayerNameAndScore);

// multiplayer

storage.forEach((eachGame) => {
  if (eachGame[0].length > 1) {
    let eachGameForMultiPlayer = [];
    eachGame[0].forEach((playerName, index) => {
      let matchPlayerNameAndScore = [];
      matchPlayerNameAndScore.push(playerName);
      matchPlayerNameAndScore.push(eachGame[1][index]);
      eachGameForMultiPlayer.push(matchPlayerNameAndScore);
    });
    multiPlayerNameAndScore.push(eachGameForMultiPlayer);
  }
});

console.log("notmul", multiPlayerNameAndScore);

let multiPlayerNameAndScoreSort = [];

multiPlayerNameAndScore.forEach((eachGame) => {
  eachGame.sort((a, b) => b[1] - a[1]);
  multiPlayerNameAndScoreSort.push(eachGame);
});

console.log(multiPlayerNameAndScoreSort);

multiPlayerNameAndScoreSort.forEach((eachGame, index) => {
  console.log(eachGame);
  let colorIndex = index;
  if (index >= colorBootstrap.length) {
    colorIndex = index % colorBootstrap.length;
  }
  let htmlStr = `<tr class="table-${
    colorBootstrap[colorIndex]
  }"><th scope="row">${index + 1}</th>`;
  eachGame.forEach((eachPlayer) => {
    htmlStr += `<td>${eachPlayer[0]}</td><td>${eachPlayer[1]}</td>`;
  });
  let placeCountLeft = 4 - eachGame.length;
  console.log(placeCountLeft);
  if (placeCountLeft > 0) {
    for (let i = 0; i < placeCountLeft; i++) {
      htmlStr += `<td>-</td><td>-</td>`;
    }
  }
  htmlStr += `</tr>`;
  console.log(htmlStr);
  multiPlayerBodyTableElement.innerHTML += htmlStr;
  console.log(multiPlayerBodyTableElement);
});
