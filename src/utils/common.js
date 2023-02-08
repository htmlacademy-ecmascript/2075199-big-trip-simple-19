const firstLetterUp = (item) => {
  if (!item) {
    return item;}
  return item[0].toUpperCase() + item.slice(1);
};

export {
  firstLetterUp,
};
