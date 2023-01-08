import { getRandomDestination } from '../mocks/destinations.js';

const DESTINATONS_COUNT = 5;

export default class DestinationsModel {
  destinations = Array.from({length: DESTINATONS_COUNT}, getRandomDestination);

  getDestinations() {
    return this.destinations;
  }
}
