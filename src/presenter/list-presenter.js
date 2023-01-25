import { render } from '../framework/render.js';
import { RenderPosition } from '../framework/render.js';
import ListView from '../view/list-view.js';
import TripSortView from '../view/sort-view.js';
// import NewPointFormView from '../view/new-form-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #listPoint = null;
  #component = new ListView();
  #sortComponent = new TripSortView();
  #noPointComponent = new NoPointView();
  // #newFormCompanent = new NewPointFormView();

  constructor({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#listPoint = [...this.#pointModel.point];
    this.#renderList();
  }

  #renderSort() {
    render(this.#sortComponent, this.#component.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#component.element, RenderPosition.AFTERBEGIN);
  }

  // #renderNewPointForm() {
  //   render(this.#renderNewPointForm, this.#component, RenderPosition.AFTERBEGIN);
  // }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({pointConteiner: this.#component.element});

    pointPresenter.init(point);
  }

  #renderList() {
    render(this.#component, this.#container);

    if (this.#listPoint.every((point) => point === null)) {
      this.#renderNoPoint();
      return;
    }
    // render (new NewPointFormView({point: this.#listPoint[0]}), this.#component.element, RenderPosition.BEFOREEND);
    // render (new TripSortView(), this.#component.element, RenderPosition.BEFOREBEIN);
    this.#renderSort();
    for (let i = 0; i < this.#listPoint.length; i++) {
      this.#renderPoint(this.#listPoint[i]);
    }
  }
}
