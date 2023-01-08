import {render, RenderPosition} from '../render.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/destination-list-view.js';
import NewFormView from '../view/new-form-view.js';
import EditView from '../view/edit-form-view.js';
import PointView from '../view/destination-points-view.js';

export default class ListPresenter {
  listComponent = new ListView;

  constructor({listConteiner, destinationsModel}) {
    this.listConteiner = listConteiner;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.destinationsList = [...this.destinationsModel.getDestinations()];

    render(this.listComponent, this.listConteiner);
    render(new NewFormView, this.listComponent.getElement());
    render(new SortView, this.listComponent.getElement());
    render(new EditView, this.listComponent.getElement(), RenderPosition.BEFOREBEGIN);

    for (let i = 0; i < this.destinationsList.length; i++) {
      render(new PointView({destination: this.destinationsList[i]}), this.listComponent.getElement());
    }
  }

}
