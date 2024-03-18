'use strict';

const timeHours = document.querySelector('.time-hours');
const timeMinutes = document.querySelector('.time-minutes');
const semiColon = document.querySelector('.semicolon');

let hasSemiColon = true;

function semiColonBlink() {
  if (hasSemiColon) {
    semiColon.innerHTML = ':';
  } else {
    semiColon.innerHTML = ' ';
  }
  hasSemiColon = !hasSemiColon;
  setTimeout(semiColonBlink, 500);
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  if (hours < 10) {
    timeHours.innerHTML = '0' + hours;
  } else 
    timeHours.innerHTML = hours;

  if (minutes < 10) {
    timeMinutes.innerHTML = '0' + minutes;
  } else
    timeMinutes.innerHTML = minutes;

  setTimeout(getTime, 1000); 
}

window.addEventListener('load', getTime);
window.addEventListener('load', semiColonBlink);
