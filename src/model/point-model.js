import Observable from '../framework/observable.js';
import { getRandomArrayElement } from '../utils/common';
import { routPoints } from '../mocks/rout-points.js';
import { offersByTypes } from '../mocks/additional-options.js';
import { destinations } from '../mocks/destinations.js';
import { nanoid } from 'nanoid';

const POINT_COUNT = 5;

const getRandomPoint = () => ({
  id:nanoid(),
  ...getRandomArrayElement(routPoints)});

export default class PointModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #allOffers = offersByTypes;
  #destinations = destinations;
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#pointsApiService.points.then((points) => {
      console.log(points);
      console.log(points.map(this.#adaptToClient));
    });
  }

  get points() {
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

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0,index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: new Date(point['date_from']),
      dateTo: new Date(point['date_to']),
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;

  }
}
