const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandom = (items) => items[Math.floor(Math.random() * items.length)];

const firstLetterUp = (item) => {
  if (!item) {
    return item;}
  return item[0].toUpperCase() + item.slice(1);
};

export {
  getRandomArrayElement,
  getRandom,
  firstLetterUp,
};
