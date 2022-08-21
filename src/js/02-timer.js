import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/common.css';

const input = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('[data-start]');

let selectedDate = null;
let interval = null;

const dateRefs = {
  daysId: document.querySelector('[data-days]'),
  hoursId: document.querySelector('[data-hours]'),
  minId: document.querySelector('[data-minutes]'),
  secId: document.querySelector('[data-sec]'),
};

const calendar = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() <= 0) {
      return Notify.failure('Please choose a date in the future');
    } else {
      selectedDate = selectedDates[0];
      btnStart.disabled = false;
    }
  },
});

btnStart.disabled = true;
btnStart.addEventListener('click', onStartTime);

function onStartTime() {
  if (selectedDate - Date.now() <= 0) {
    return Notify.failure('Please choose a date in the future');
  }
  interval = setInterval(updateTimer, 1000);
  btnStart.disabled = true;
  input.disabled = true;
}

function updateTimer() {
  const timeLeft = selectedDate - Date.now();
  const timeConverted = convertMs(selectedDate - Date.now());
  if (timeLeft < 1000) {
    clearInterval(interval);
    Notify.success('Time is up!');
    btnStart.disabled = true;
    input.disabled = true;
  }
  showTimer(timeConverted, dateRefs);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function showTimer(
  { days, hours, minutes, seconds },
  { daysId, hoursId, minId, secId }
) {
  daysId.textContent = addLeadingZero(days);
  hoursId.textContent = addLeadingZero(hours);
  minId.textContent = addLeadingZero(minutes);
  secId.textContent = addLeadingZero(seconds);
}
