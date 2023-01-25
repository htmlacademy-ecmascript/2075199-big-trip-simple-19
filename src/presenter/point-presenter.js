import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointFormView from '../view/edit-form-view.js';

export default class PointPresenter {
  #pointConteiner = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor({pointConteiner}) {
    this.#pointConteiner = pointConteiner;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handelEditClick,
    });

    this.#pointEditComponent = new EditPointFormView({
      point: this.#point,
      onFormSubmit: this.#handelFormSumnit,
      onEditCloseClick: this.#handelEditCloseClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointConteiner);
      return;
    }

    if (this.#pointConteiner.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointConteiner.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replasePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handelEditClick = () => {
    this.#replasePointToForm();
  };

  #handelEditCloseClick = () => {
    this.#replaceFormToPoint();
  };

  #handelFormSumnit = () => {
    this.#replaceFormToPoint();
  };
}
