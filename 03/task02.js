let t2Input = document.querySelector('#f4txtSzam');
t2Input.addEventListener('keypress', justAcceptNumber);

function justAcceptNumber(event) {
  // a)
  let isNumber = event.keyCode >= 48 && event.keyCode <= 57;
  if (!isNumber) {
    event.preventDefault();
  }
}
// b
document.addEventListener('keypress', (e) =>  {
  if (e.target.tagName == "INPUT") {
    console.log(e.target);
    let hasNumberClass = e.target.className.search('number') != -1;
    if (hasNumberClass) {
      justAcceptNumber(e);
    }
  }
});
