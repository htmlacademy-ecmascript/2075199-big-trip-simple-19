// import { render, replace } from '../framework/render.js';
import { render } from '../framework/render.js';
import { RenderPosition } from '../framework/render.js';
import ListView from '../view/list-view.js';
import TripSortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
// import NewPointFormView from '../view/new-form-view.js';
import EditPointFormView from '../view/edit-form-view.js';
import NoPointView from '../view/no-point-view.js';

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #listPoint = null;
  #component = new ListView();

  constructor({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#listPoint = [...this.#pointModel.point];
    this.#renderList();
  }

  #renderPoint(point) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponet = new EditPointFormView({
      point,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditCloseClick: () => {
        replaceFormToPoint.call(this);
      }
    });

    // function replacePointToForm() {
    //   replace(pointEditComponet, pointComponent);
    // }

    // function replaceFormToPoint() {
    //   replace(pointComponent, pointEditComponet);
    // }

    function replacePointToForm () {
      this.#component.element.replaceChild(pointEditComponet.element, pointComponent.element);
    }

    function replaceFormToPoint() {
      this.#component.element.replaceChild(pointComponent.element, pointEditComponet.element);
    }

    render(pointComponent, this.#component.element, RenderPosition.BEFOREEND);
  }

  #renderList() {
    render(this.#component, this.#container);

    if (this.#listPoint.every((point) => point === null)) {
      render(new NoPointView(), this.#component.element, RenderPosition.BEFOREBEGIN);
      return;
    }
    // render (new EditPointFormView({point: this.listPoint[0]}), this.component.element, RenderPosition.AFTERBEGIN);
    // render (new NewPointFormView({point: this.#listPoint[0]}), this.#component.element, RenderPosition.BEFOREEND);
    render (new TripSortView(), this.#component.element, RenderPosition.BEFOREBEGIN);
    for (let i = 0; i < this.#listPoint.length; i++) {
      this.#renderPoint(this.#listPoint[i]);
    }
  }
}
