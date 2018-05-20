// Opera 8.0+
// var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined'

// Safari 3.0+ "[object HTMLElementConstructor]"
/* eslint-disable */
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]' })(!window['safari'] || safari.pushNotification)

// Internet Explorer 6-11
var isIE = /* @cc_on!@ */false || !!document.documentMode

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore

// Blink engine detection
// var isBlink = (isChrome || isOpera) && !!window.CSS

var doc = document.getElementsByTagName('html')[0]
if (isChrome) {
  doc.setAttribute('browser', 'chrome')
} else if (isFirefox) {
  doc.setAttribute('browser', 'firefox')
} else if (isSafari) {
  doc.setAttribute('browser', 'safari')
} else if (isEdge) {
  doc.setAttribute('browser', 'edge')
} else if (isIE) {
  doc.setAttribute('browser', 'ie')
}
