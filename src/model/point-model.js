import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #offersByTypes = [];
  #destinations = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points.map((point) => {
      const offerByTypes = this.#getOfferByTypes(point).offerByTypes;
      const destination = this.#getDestination(point).destination;
      const offersByTypes = this.#offersByTypes;
      const destinations = this.#destinations;

      return {
        ...point,
        destination,
        offerByTypes,
        offersByTypes,
        destinations
      };
    });
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      const allOffers = await this.#pointsApiService.offers;
      const destinations = await this.#pointsApiService.destinations;

      this.#points = points.map(this.#adaptToClient);
      this.#offersByTypes = allOffers;
      this.#destinations = destinations;
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  #getOfferByTypes = (point) => {
    const offerByTypes = this.#offersByTypes.find((offer) => offer.type === point.type);
    return { offerByTypes };
  };

  #getDestination = (point) => {
    const destination = this.#destinations.find((direction) => direction.id === point.destination);
    return { destination };
  };

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
