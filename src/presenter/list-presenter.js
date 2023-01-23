import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/destination-list-view.js';
// import NewFormView from '../view/new-form-view.js';
import EditView from '../view/edit-form-view.js';
import PointView from '../view/destination-points-view.js';
import { offersByType } from '../mocks/destinations.js';
import NoPointView from '../view/no-point-view.js';


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
    this.#renderList();
  }

  #renderPoint(trip, allOffers) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      trip,
      allOffers,
      onEditClick: () => {
        replacePointToEdit.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditView({
      trip,
      allOffers,
      onFormSubmit: () => {
        replaceEditToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        replaceEditToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEdit () {
      this.#listComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    }

    function replaceEditToPoint () {
      this.#listComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    }

    render(pointComponent, this.#listComponent.element);
  }


  #renderList() {
    this.#destinationsList = [...this.#destinationsModel.destinations];
    render(this.#listComponent, this.#listConteiner);

    if (this.#destinationsList.every((destination) => destination.isArchive)) {
      render(new NoPointView, this.#listComponent.element);
    } else {
      render(new SortView, this.#listComponent.element);
      // render(new NewFormView({trip: this.#destinationsList[0], allOffers: offersByType}), this.#listComponent.element);
      for (let i = 0; i < this.#destinationsList.length; i++) {
        this.#renderPoint(this.#destinationsList[i], offersByType);
      }
    }
  }
}

