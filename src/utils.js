import dayjs from 'dayjs';

const maxRandomInt = 1000;
const FULL_DATE_TRAVEL = 'DD/MM/YY HH:mm';
const DATE_TRAVEL = 'MMM YY';
const TIME_TRAVEL = 'HH:mm';


function getRandomArrayElement (array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt () {
  return Math.floor(Math.random() * maxRandomInt);
}

function humanizeFullDateTravel (dueDate) {
  return dueDate ? dayjs(dueDate).format(FULL_DATE_TRAVEL) : '';
}

function humanizeDateTravel (dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_TRAVEL) : '';
}

function humanizeTimeTravel (dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_TRAVEL) : '';
}


export {
  getRandomArrayElement,
  getRandomInt,
  humanizeFullDateTravel,
  humanizeDateTravel,
  humanizeTimeTravel
};
