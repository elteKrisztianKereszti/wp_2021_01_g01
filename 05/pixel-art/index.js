let grid = {
  height: 0,
  width: 0,
  table: [],
  currentColor: '#ff0000',
  generate: function(width, height) {
    this.table = [];
    for (let x = 0; x < height ; ++x) {
      let row = [];
      for (let y = 0; y < width; ++y) {
        row.push(undefined);
      }
      this.table.push(row);
    }
  
    this.height = height;
    this.width = width;  
  },
  setColor: function(x, y) {
    this.table[x][y] = this.currentColor;
  },
  clearColor: function(x, y) {
    
    this.table[x][y] = undefined;
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

let btnSave = document.querySelector('#btnSave');
btnSave.addEventListener('click', onSaveClick);
function onSaveClick() {
  pixelArts.push({
    id: new Date(),
    // 'Deepcopy'
    pixels: JSON.parse(JSON.stringify(grid.table)),
  });

  localStorage['pixelArts'] = JSON.stringify(pixelArts);
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
  // TODO
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
  let tableInnerHtml = '';
  for (let rowIndex = 0; rowIndex < grid.height; ++rowIndex ) {
    tableInnerHtml += '<tr>';
    for (let columnIndex = 0; columnIndex < grid.width; ++columnIndex ) {
      tableInnerHtml += '<td style="background-color: ' + grid.table[rowIndex][columnIndex]+ '" data-row=' + rowIndex + ' data-column=' + columnIndex + '></td>'
    }
    tableInnerHtml += '</tr>'
  }
  previewGrid.innerHTML = tableInnerHtml;
  editGrid.innerHTML = tableInnerHtml;

  inputColor.value = grid.currentColor;
}

