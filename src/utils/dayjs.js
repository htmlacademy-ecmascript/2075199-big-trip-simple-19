import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';
const DAY_FORMAT = 'DD MMM';
const MACHINE_DAY_FORMAT = 'YYYY-MM-DD';
const MACHINE_TIME_FORMAT = 'YYYY-MM-DDThh:mm';

const fullDateFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';
const fullDateTo = (dateTo) => dateTo ? dayjs(dateTo).format(DATE_FORMAT) : '';
const machineDateTimeFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(MACHINE_TIME_FORMAT) : '';
const dateTimeFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(TIME_FORMAT) : '';
const machineDateTimeTo = (dateTo) => dateTo ? dayjs(dateTo).format(MACHINE_TIME_FORMAT) : '';
const dateTimeTo = (dateTo) => dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
const dayDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DAY_FORMAT) : '';
const machineDayDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(MACHINE_DAY_FORMAT) : '';

function getWeightForNullDate (dateA, dateB) {
  if (dateA === 0 && dateB === 0) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortPointDay (pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointPrice (pointA, pointB) {
  const weight = getWeightForNullDate(pointA.basePrice, pointB.basePrice);

  return weight ?? dayjs(pointB.basePrice).diff(dayjs(pointA.basePrice));
}


export {
  fullDateFrom,
  fullDateTo,
  dateTimeFrom,
  dateTimeTo,
  dayDate,
  machineDayDate,
  machineDateTimeFrom,
  machineDateTimeTo,
  sortPointDay,
  sortPointPrice,
};
