'use script';
let siteName = document.getElementById('siteName');
let logo = document.getElementById('logo');

logo.onmouseenter = function() {
  if (document.body.clientWidth < 1071) return; 
  siteName.style.top = '0';
}

logo.onmouseleave = function() {
  if (document.body.clientWidth < 1071) return; 
  siteName.style.top = '-130px';
}
