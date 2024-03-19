'use strict';

const timeHours = document.querySelector('.time-hours');
const timeMinutes = document.querySelector('.time-minutes');
const semiColon = document.querySelector('.semicolon');

//blinking semicolon
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

//time screen
function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  (hours < 10) ? timeHours.innerHTML = '0' + hours : timeHours.innerHTML = hours;
  (minutes < 10) ? timeMinutes.innerHTML = '0' + minutes : timeMinutes.innerHTML = minutes;
  setTimeout(getTime, 1000); 
}
const setAlarmButton = document.querySelector('.set-alarm');
const alarmScreen = document.querySelector('.alarm p');
const alarmSound = new Audio('./src/media/alarm.mp3');
alarmSound.type = 'audio/mpeg';
alarmSound.loop = true;

// 00, 0, 01, 1, 02, ... 23
const hoursRegex = /^(0?[0-9]|1[0-9]|2[0-3])$/;
// 00, 0, 01, 1, 02, ... 59
const minutesRegex = /^(0?[0-9]|[1-5][0-9])$/;

//input type text fields
const inputHours = document.querySelector('.input-hours');
const inputMinutes = document.querySelector('.input-minutes');

let alarmHours;
let alarmMinutes;

function setAlarm() {
  alarmHours = inputHours.value;
  alarmMinutes = inputMinutes.value;
  // reset and set red highlight in case of invalid input
  inputHours.style.backgroundColor = "#fff"
  inputMinutes.style.backgroundColor = "#fff"
  if (hoursRegex.test(alarmHours) && minutesRegex.test(alarmMinutes)){
  setAlarmScreen(alarmHours, alarmMinutes);
  waitForAlarm(alarmHours, alarmMinutes);
  } else {
  if (!hoursRegex.test(alarmHours))
    inputHours.style.backgroundColor = "#f11818"; //Wrong hrs input hightlight
  if (!minutesRegex.test(alarmMinutes))
  inputMinutes.style.backgroundColor = "#f11818"; //Wrong min input hightlight
  }
}

function setAlarmScreen(hh, mm) {
  alarmScreen.innerHTML = `${hh}:${mm}`;
}

function waitForAlarm() {
  const date = new Date();
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  const currentSeconds = date.getSeconds();

  if ((currentHours.toString() === alarmHours) 
      && (currentMinutes.toString() === alarmMinutes) 
      && (currentSeconds < 2)) {
    alarmSound.play();
    alarmTriggered();
    setTimeout(waitForAlarm, 60000); // 1 minute, so not trigering alarm again
    setTimeout(alarmStop, 60000);
  } else
    setTimeout(waitForAlarm, 1000);
}

function alarmTriggered() {
  let colorRed = '#c41519'
  timeHours.style.color = colorRed;
  timeMinutes.style.color = colorRed;
  semiColon.style.color = colorRed;
  isShaking = true;
  shake();
  setAlarmButton.removeEventListener('click', setAlarm);
  setAlarmButton.value = 'STOP';
  setAlarmButton.style.backgroundColor = colorRed;
  setAlarmButton.addEventListener('click', alarmStop);
}

function alarmStop() {
  let colorWhite = '#fff';
  timeHours.style.color = colorWhite;
  timeMinutes.style.color = colorWhite;
  semiColon.style.color = colorWhite;
  alarmSound.pause();
  isShaking = false;  
  setAlarmButton.removeEventListener('click', alarmStop);
  setAlarmButton.value = 'Set Alarm';
  setAlarmButton.style.backgroundColor = '#199017';
  setAlarmButton.addEventListener('click', setAlarm);
  alarmScreen.innerHTML = 'No alarm set';
}

const screen = document.getElementById('screen');
let isShaking = true;
function shake() {
  screen.classList.add('shake');
  setTimeout(() => {
    screen.classList.remove('shake');
    if (isShaking) {
      setTimeout(shake, 1000);
    }
  }, 1000); 
}

setAlarmButton.addEventListener('click', setAlarm);
window.addEventListener('load', getTime);
window.addEventListener('load', semiColonBlink);

