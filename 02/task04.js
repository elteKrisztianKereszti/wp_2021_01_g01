let btn4calculator = document.querySelector('#btn4calculator');
let txt4radius = document.querySelector('#txt4radius');
let div4sol = document.querySelector('#div4sol');

btn4calculator.addEventListener('click', () => {
  let r = txt4radius.value;
  let solutionForInnerHTML = calculateCircumference(r);
  div4sol.innerHTML = solutionForInnerHTML;
});

function calculateCircumference(r) {
  return 2 * r * Math.PI;
}

