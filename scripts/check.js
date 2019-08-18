const agent = window.navigator.userAgent.toLowerCase();

if (agent.indexOf('msie') >= 0 || agent.indexOf('trident') >= 0) {
  alert('Sorry, Internet Explorer is not supported.');
  window.history.back();
}
