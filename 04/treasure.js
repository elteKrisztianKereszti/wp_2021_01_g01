let map = document.querySelector('#map');
map.addEventListener('click', onMapClick);
let treasureLocation= { x: 0, y: 0};


function onMapClick(event) {
  if (event.target.className.indexOf('cell') !== -1) {
    let x = event.target.getAttribute('data-x');
    let y = event.target.getAttribute('data-y');
    if (x == treasureLocation.x && y == treasureLocation.y) {
      console.log(x, y, treasureLocation);
      event.target.innerHTML = "#T";
    }
  }
}

function initGame() {
  // 2x2
  const size = 2;

  treasureLocation.x = Math.floor(Math.random() * size);
  treasureLocation.y = Math.floor(Math.random() * size);
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
}

initGame();