import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate = '';
const currentDate = new Date();

let button = document.querySelector('[data-start]');
button.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
  },
  onChange: function (selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
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
    console.log(days, hours, minutes, seconds);
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
