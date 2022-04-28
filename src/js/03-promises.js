import Notiflix from 'notiflix';

const inputDelayEl = document.querySelector('input[name=delay]');
const inputStepEl = document.querySelector('input[name=step]');
const inputAmountEl = document.querySelector('input[name=amount]');
const submitButtonEl = document.querySelector('button[type=submit]');

submitButtonEl.addEventListener('click', onCreatePrimises);

function onCreatePrimises(evt) {
  evt.preventDefault();

  const amount = inputAmountEl.value;
  const delay = Number(inputDelayEl.value);
  const step = Number(inputStepEl.value);

  for (let i = 1; i <= amount; i += 1) {
    let interval = delay + step * (i - 1);

    createPromise(i, interval)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
