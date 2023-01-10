import {render, RenderPosition} from '../render.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/destination-list-view.js';
// import NewFormView from '../view/new-form-view.js';
import EditView from '../view/edit-form-view.js';
import PointView from '../view/destination-points-view.js';
import { offersByType } from '../mocks/destinations.js';


export default class ListPresenter {
  #listConteiner = null;
  #destinationsModel = null;
  #destinationsList = null;
  #listComponent = new ListView;

  constructor({listConteiner, destinationsModel}) {
    this.#listConteiner = listConteiner;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#destinationsList = [...this.#destinationsModel.destinations];
    render(this.#listComponent, this.#listConteiner);
    render(new SortView, this.#listComponent.element);
    // render(new NewFormView({trip: this.#destinationsList[0], allOffers: offersByType}), this.#listComponent.element);
    // render(new EditView({trip: this.#destinationsList[1], allOffers: offersByType}), this.#listComponent.element, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.#destinationsList.length; i++) {
      this.#renderPoint(this.#destinationsList[i], offersByType);
    }

  }

  #renderPoint(trip, allOffers) {
    const pointComponent = new PointView({trip, allOffers});
    const pointEditComponent = new EditView({trip, allOffers});

    const replacePointToEdit = () => {
      this.#listComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceEditToPoint = () => {
      this.#listComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
      pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replaceEditToPoint);
    });

    pointEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#listComponent.element);
  }
}

