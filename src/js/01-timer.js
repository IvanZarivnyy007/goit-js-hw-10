import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = '';
const currentDate = new Date();

let button = document.querySelector('[data-start]');
let dataDays = document.querySelector('[data-days]');
let dataHours = document.querySelector('[data-hours]');
let dataMinutes = document.querySelector('[data-minutes]');
let dataSeconds = document.querySelector('[data-seconds]');
// let time = document.querySelector('.time');

button.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
  },
  onChange: function (selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= currentDate) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        title: 'Warning',
        color: 'red',
      });

      button.setAttribute('disabled', '');
    } else {
      button.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

button.addEventListener('click', () => {
  button.setAttribute('disabled', '');
  fp.input.setAttribute('disabled', '');
  const interval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      userSelectedDate - new Date()
    );

    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);

    if (!days && !hours && !minutes && !seconds) {
      clearInterval(interval);
    }
  }, 1000);
});

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

function addLeadingZero(dateStr) {
  return dateStr.toString().padStart(2, '0');
}
