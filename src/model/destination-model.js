import {
  offersByType,
  pointsInfo,
  pointsList
} from '../mocks/destinations.js';
import { getRandomArrayElement } from '../utils.js';


const DESTINATONS_COUNT = 10;

function makePoint (points, destination, offers) {
  points.map((point) => {
    const pointOffers = [];
    point.destination = destination.find((pointId) => {
      if (point.id === pointId.id) {
        return pointId;
      }
    });
    point.offers.map((pointId) => {
      offers.find((pointType) => {
        if (point.type === pointType.type) {
          pointType.offers.find((offerId) => {
            if (offerId.id === pointId) {
              pointOffers.push(offerId);
              point.offers = pointOffers;
            }
          });
        }
      });
    });
  });
  return points;
}


function getRandomDestination () {
  return getRandomArrayElement(makePoint(pointsInfo, pointsList, offersByType));
}

export default class DestinationsModel {
  #destinations = Array.from({length: DESTINATONS_COUNT}, getRandomDestination);

  get destinations() {
    return this.#destinations;
  }
}
