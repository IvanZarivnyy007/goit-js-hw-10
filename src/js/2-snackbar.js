import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let inputDelay = document.querySelector('[name="delay"]');
let twoinput = document.getElementsByName('state');
let form = document.querySelector('.form');

form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const radioValue = Array.from(twoinput).find(item => {
    return item.checked;
  }).value;
  const delay = inputDelay.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioValue === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => {
      iziToast.show({
        message,
        position: 'topRight',
        title: 'Success',
        color: 'green',
      });
    })
    .catch(message => {
      iziToast.show({
        message,
        position: 'topRight',
        title: 'Warning',
        color: 'red',
      });
    });
}
