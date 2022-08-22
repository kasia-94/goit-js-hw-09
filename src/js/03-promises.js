import '../css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function getValue() {
  return {
    delay: Number(delayEl.value),
    step: Number(stepEl.value),
    amount: Number(amountEl.value),
  };
}

function onSubmitClick(e) {
  e.preventDefault();
  const { delay, step, amount } = getValue();
  setTimeout(startPromise, delay, step, amount, delay);
}

function startPromise(step, amount) {
  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => {
      createPromise(i, step * i)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, step);
  }
}
