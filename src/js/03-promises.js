import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onCreatePrimises);

function onCreatePrimises(evt) {
  evt.preventDefault();

  const elements = evt.currentTarget.elements;

  const amount = elements.amount.value;
  const delay = Number(elements.delay.value);
  const step = Number(elements.step.value);

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
