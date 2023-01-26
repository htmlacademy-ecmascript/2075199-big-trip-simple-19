import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointFormView from '../view/edit-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointConteiner = null;
  #handlerPointChange = null;
  #handelModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({pointConteiner, onDataChange, onModeChange}) {
    this.#pointConteiner = pointConteiner;
    this.#handlerPointChange = onDataChange;
    this.#handelModeChange = onModeChange;
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replasePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handelModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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

  #handelFormSumnit = (point) => {
    this.#handlerPointChange(point);
    this.#replaceFormToPoint();
  };
}
