let map = document.querySelector('#map');
map.addEventListener('click', onMapClick);
let treasureLocation= { x: 0, y: 0};
let missClickCounter = 0;

let sizeInput = document.querySelector('#size');
let newGameBtn = document.querySelector('#newGame');
let missClick = document.querySelector('#missClick');
newGameBtn.addEventListener('click', () => {
  initGame(sizeInput.value)
});

function onMapClick(event) {
  if (event.target.className.indexOf('cell') !== -1) {
    let x = event.target.getAttribute('data-x');
    let y = event.target.getAttribute('data-y');
    if (x == treasureLocation.x && y == treasureLocation.y) {
      console.log(x, y, treasureLocation);
      event.target.innerHTML = "#T";
      setTimeout(() => {
        initGame(sizeInput.value);
      }, 2000);
    }
    else {
      missClick.innerHTML = ++missClickCounter;
    }
  }
}

function initGame(size) {
  treasureLocation.x = Math.floor(Math.random() * (0+size));
  treasureLocation.y = Math.floor(Math.random() * (0+size));
  console.log(treasureLocation);

  let innerHtml = '';
  for (let y = 0; y < size; ++y) {
    innerHtml += '<tr>';
    for (let x = 0; x < size; ++x) {
      innerHtml += '<td><div data-x="' + x + '" data-y="' + y + ' " class="cell"></div></td>';
    }
    innerHtml += '</tr>';
  }
  map.innerHTML = innerHtml;
  missClickCounter = 0;
}

