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
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          title: 'Success',
          color: 'green',
        });
        resolve();
      } else {
        iziToast.show({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          title: 'Warning',
          color: 'red',
        });
        reject();
      }
    }, delay);
  });
  return promise;
}
