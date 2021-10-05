let t1par = document.querySelector('#t1par');
t1par.addEventListener('click', t1parOnClick);

function t1parOnClick(e) {
  console.log('Clicked');
  // a
  console.log(this);
  // b
  console.log(e.type);
  // c
  console.log(e.button);
  // d
  console.log(e.x + ", " + e.y);
  // e
  if (e.target.tagName === "SPAN") {
    console.log(e.target.innerHTML);
  }
  // f
  if (e.target.tagName === "A") {
    if (e.target.innerHTML.search('libero') != -1) {
      e.preventDefault();
    }
  }
}
