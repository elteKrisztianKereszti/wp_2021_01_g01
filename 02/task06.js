window.addEventListener(
  'load',
  () => getAllUrls());

function getAllUrls() {
  let allUrls = document.querySelectorAll('a');
  let allHrefsForInnerHtml = '<li>' + 
    [...allUrls]
    .map(a => a.href)
    .join('</li><li>')
    + '</li>';

  document
    .querySelector('#urls')
    .innerHTML = allHrefsForInnerHtml;
}
