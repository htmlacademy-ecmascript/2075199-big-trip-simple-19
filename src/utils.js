const maxRandomInt = 1000;

function getRandomArrayElement (array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt () {
  return Math.floor(Math.random() * maxRandomInt);
}

export {getRandomArrayElement, getRandomInt};
