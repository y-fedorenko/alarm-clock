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


const setAlarmButton = document.querySelector('.set-alarm');
const alarmScreen = document.querySelector('.alarm p');

const alarmSound = new Audio('./src/media/alarm.mp3');
alarmSound.type = 'audio/mpeg';
//alarmSound.play(); // does not work due to autoplay blocking

const hoursRegex = /^(0?[0-9]|1[0-9]|2[0-3])$/;
const minutesRegex = /^(0?[0-9]|[1-5][0-9])$/;

const inputHours = document.querySelector('.input-hours');
const inputMinutes = document.querySelector('.input-minutes');

let alarmHours;
let alarmMinutes;

function setAlarm(){
alarmHours = inputHours.value;
alarmMinutes = inputMinutes.value;

inputHours.style.backgroundColor = "#fff"
inputMinutes.style.backgroundColor = "#fff"

if (hoursRegex.test(alarmHours) && minutesRegex.test(alarmMinutes)){
  setAlarmScreen(alarmHours, alarmMinutes);
  waitForAlarm(alarmHours, alarmMinutes);
} else {
  if (!hoursRegex.test(alarmHours))
    inputHours.style.backgroundColor = "#f11818";
  if (!minutesRegex.test(alarmMinutes))
  inputMinutes.style.backgroundColor = "#f11818";
}
  

}

function setAlarmScreen(hh, mm) {
  alarmScreen.innerHTML = `${hh}:${mm}`;
}

function waitForAlarm() {
  const date = new Date();
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  if ((currentHours.toString() === alarmHours) && (currentMinutes.toString() === alarmMinutes)) {
    alarmSound.play();
    setTimeout(waitForAlarm, 60000);
  } else
    setTimeout(waitForAlarm, 1000);
}

setAlarmButton.addEventListener('click', setAlarm);
window.addEventListener('load', getTime);
window.addEventListener('load', semiColonBlink);