import { getRandomDestination } from '../mocks/destinations.js';

const DESTINATONS_COUNT = 10;

export default class DestinationsModel {
  #destinations = Array.from({length: DESTINATONS_COUNT}, getRandomDestination);

  get destinations() {
    return this.#destinations;
  }
}
