
function setRemUnit() {
  const docEl = document.documentElement;
  let w = docEl.clientWidth;
  var rem = docEl.clientWidth / 10;
  docEl.style.fontSize = rem + 'px';
}

(function () {
  setRemUnit();
  window.addEventListener("resize", setRemUnit);
})()