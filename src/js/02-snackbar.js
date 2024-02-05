import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let inputDelay = document.querySelector('[name="delay"]');
let twoinput = document.querySelector('[name="state"]');
let form = document.querySelector('.form');

// twoinput.addEventListener('click', createPromise);
form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  console.log(twoinput.value);
  const delay = inputDelay.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (twoinput.value) {
        iziToast.show({
          message: 'Please choose a date in the future',
          position: 'topRight',
          title: 'Warning',
          color: 'red',
        });
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
}
