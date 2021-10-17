let grid = {
  id:0,
  pixels: [],
  currentColor: '#ff0000',
  generate: function(width, height) {
    this.pixels = [];
    for (let x = 0; x < height ; ++x) {
      let row = [];
      for (let y = 0; y < width; ++y) {
        row.push(undefined);
      }
      this.pixels.push(row);
    }
    this.id = 0;
  },
  setColor: function(x, y) {
    this.pixels[x][y] = this.currentColor;
  },
  clearColor: function(x, y) {    
    this.pixels[x][y] = undefined;
  },
  setCurrentColor: function(newColor) {
    this.currentColor = newColor;
  }
};

const pixelArts = localStorage['pixelArts'] ? JSON.parse(localStorage['pixelArts']) : [
  {
      id: 1,
      pixels: [
          ['#123456', '#234567', '#345678']
      ]
  },
  {
      id: 2,
      pixels: [
          ['#123456'],
          ['#234567'],
          ['#345678']
      ]
  },
]

console.log(pixelArts);

let btnGenerate = document.querySelector('#btnGenerate');
let inputWidth = document.querySelector('#width');
let heightWidth = document.querySelector('#height');

let previewGrid = document.querySelector('#previewGrid');
let editGrid = document.querySelector('#editGrid');
let inputColor = document.querySelector('#inputColor');
let pixelArtsUl = document.querySelector('#pixel-arts');

let btnSave = document.querySelector('#btnSave');
btnSave.addEventListener('click', onSaveClick);
pixelArtsUl.addEventListener('click', onPixelArtsUlClick);

function onPixelArtsUlClick(event) {
  if (event.target.tagName === 'UL') {
    return;
  }

  // look for LI => go up to LI
  let currentElement = event.target;
  while (currentElement.tagName !== 'LI') {
    currentElement = currentElement.parentElement;
  }

  let pixelArtId = currentElement.getAttribute('pixel-art-id');
  loadPixelArt(pixelArtId);
}

function loadPixelArt(pixelArtId) {

  let pixelArt = pixelArts.find(pa => pa.id == pixelArtId);

  grid.pixels = JSON.parse(JSON.stringify(pixelArt.pixels));
  grid.id = pixelArt.id;

  render();
}

function onSaveClick() {
  if (grid.id != 0) {
    let pixelArt = pixelArts.find(pa => pa.id == grid.id);
    pixelArt.pixels = JSON.parse(JSON.stringify(grid.pixels));
  }
  else {
    pixelArts.push({
      id: Date.now(),
      pixels: JSON.parse(JSON.stringify(grid.pixels)),
    });
  }[]

  localStorage['pixelArts'] = JSON.stringify(pixelArts);
  listAllPixelArts();
}


btnGenerate.addEventListener('click', getGridParameters);
editGrid.addEventListener('click', onEditGridClick);
editGrid.addEventListener('contextmenu', onEditGridContextMenu);
inputColor.addEventListener('change', onColorChange);
function onColorChange() {
  grid.setCurrentColor(this.value);
}

function onEditGridClick(event) {
  if (event.target.tagName !== 'TD') {
    return;
  }

  let rowIndex = event.target.getAttribute('data-row');
  let columnIndex = event.target.getAttribute('data-column');

  grid.setColor(rowIndex, columnIndex);

  render();
}

function onEditGridContextMenu(event) {
  if (event.target.tagName !== 'TD') {
    return;
  }

  let rowIndex = event.target.getAttribute('data-row');
  let columnIndex = event.target.getAttribute('data-column');
  event.preventDefault();
  grid.clearColor(rowIndex, columnIndex);

  render();
}

function getGridParameters(event) {
  event.preventDefault();

  let width = parseInt(inputWidth.value);
  let height = parseInt(heightWidth.value);

  grid.generate(width, height);
  render();
}

function render() {
  let tableInnerHtml =  generateTableContent(grid.pixels);
  previewGrid.innerHTML = tableInnerHtml;
  editGrid.innerHTML = tableInnerHtml;

  inputColor.value = grid.currentColor;
}

function generateTableContent(pixels) {
  let tableInnerHtml = '';
  for (let rowIndex = 0; rowIndex < pixels.length; ++rowIndex ) {
    tableInnerHtml += '<tr>';
    for (let columnIndex = 0; columnIndex < pixels[0].length; ++columnIndex ) {
      tableInnerHtml += '<td style="background-color: ' + pixels[rowIndex][columnIndex]+ '" data-row=' + rowIndex + ' data-column=' + columnIndex + '></td>'
    }
    tableInnerHtml += '</tr>'
  }
  return tableInnerHtml;
}

function listAllPixelArts() {
  let ulContent = '';
  
  pixelArts.forEach((pixelArt) => {
    ulContent += '<li pixel-art-id=' + pixelArt.id + '>';
    ulContent += '<table>' + generateTableContent(pixelArt.pixels) + '</table>';
    ulContent += '</li>';
  })

  pixelArtsUl.innerHTML = ulContent;
}

listAllPixelArts();
