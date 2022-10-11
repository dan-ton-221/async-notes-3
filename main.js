/*How to implement a promise-based API:
Wrapping an asynchronous operation which could use events, callbacks, or
message-passing model. Arrange for a Promise object to handle the success or
failure of the operation.

Implementing an alarm() API:
alarm() takes arguments such as name of person to wake up and milliseconds to wait
before waking the person up. After the delay, the function will send a "Wake up" message.

Wrapping setTimeout():
setTimeout() starts a timer set to the given delay and when the time expires, it calls the
function.

<button id="set-alarm">Set alarm</button>
<div id="output"></div>
Copy to Clipboard
const output = document.querySelector('#output');
const button = document.querySelector('#set-alarm');

function setAlarm() {
  setTimeout(() => {
    output.textContent = 'Wake up!';
  }, 1000);
}

button.addEventListener('click', setAlarm);

The Promise() constructor:
The Promise() constructor takes a single function as an argument. We'll call this function 
the executor. When you create a new promise you supply the implementation of the executor.
You call resolve, and if it fails, you call reject. If the executor function throws an error,
reject is called automatically. You can pass a single parameter of any type into resolve and 
reject.

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

This function creates and returns a new Promise. Inside the executor for the promise, we:

check that delay is not negative, and throw an error if it is. call setTimeout(), passing a 
callback and delay. The callback will be called when the timer expires, and in the callback 
we call resolve, passing in our "Wake up!" message.

Using the alarm() API:
const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', () => {
  alarm(name.value, delay.value)
    .then((message) => output.textContent = message)
    .catch((error) => output.textContent = `Couldn't set alarm: ${error}`);
});

Using async and await with the alarm() API:
const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  }
  catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});