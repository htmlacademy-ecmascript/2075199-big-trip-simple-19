import { getRandomArrayElement } from '../utils/utils';
import { routPoints } from '../mocks/rout-points.js';
import { offersByTypes } from '../mocks/additional-options.js';
import { destinations } from '../mocks/destinations.js';
import { nanoid } from 'nanoid';

const POINT_COUNT = 5;

const getRandomPoint = () => ({
  id: nanoid(),
  ...getRandomArrayElement(routPoints),
});

export default class PointModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #allOffers = offersByTypes;
  #destinations = destinations;

  get point() {
    return this.#points.map((point) => {
      const offerByTypes = this.#allOffers.find((offer) => offer.type === point.type);
      const destination = this.#destinations.find((direction) => direction.id === point.destination);
      return {
        ...point,
        destination,
        offerByTypes,
        offersByTypes,
        destinations
      };
    });
  }
}
