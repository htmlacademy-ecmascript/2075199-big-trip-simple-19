import { getRandomArrayElement } from '../utils';
import { routPoints } from '../mocks/rout-points';
import { offersByTypes } from '../mocks/additional-options';
import { destinations } from '../mocks/destinations';

const POINT_COUNT = 3;

const getRandomPoint = () => getRandomArrayElement(routPoints);

export default class PointModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #allOffers = offersByTypes;
  #destinations = destinations;

  get point() {
    return this.#points.map((point) => {
      // const {offers} = point;
      const offerByTypes = this.#allOffers.find((offer) => offer.type === point.type);
      const pointDestination = this.#destinations.find((direction) => direction.id === point.destination);
      point.destination = pointDestination;
      // const checkedOffer = [];
      // offerByTypes.offers.map((offer) => {
      //   if (offers.includes(offer.id)) {
      //     checkedOffer.push(offer);
      //   }
      // });
      // point.offers = checkedOffer;
      return {
        ...point,
        offerByTypes,
        offersByTypes,
        destinations
      };
    });
  }
}
