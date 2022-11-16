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
  }"><th scope="row">${index + 1}</th><td>${key}</td><td>${localStorage.getItem(
    key
  )}</td></tr>`;
});
