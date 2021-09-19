let btn3renderer = document.querySelector('#btn3renderer');
let txt3number = document.querySelector('#txt3number');
let div3sol = document.querySelector('#div3sol');

btn3renderer.addEventListener('click', () => {
  let n = txt3number.value;
  txt3number.focus();
  // let solutionForInnerHTML = renderNxNmultiplicationTable(n);
  // div3sol.innerHTML = solutionForInnerHTML;
});

function renderNxNmultiplicationTable(n) {
  let innerHtml = '';

  for (let y = 1; y <= n; ++y) {
    innerHtml += '<tr>';
    for (let x = 1; x <= n; ++x) {
      innerHtml += '<td>' + y * x + '</td>';
    }
    innerHtml += '</tr>';
  }

  return '<table>' + innerHtml + '</table>';
}