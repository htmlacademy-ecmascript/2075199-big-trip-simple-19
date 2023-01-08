import {render, RenderPosition} from '../render.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/destination-list-view.js';
import NewFormView from '../view/new-form-view.js';
// import EditView from '../view/edit-form-view.js';
import PointView from '../view/destination-points-view.js';
import { offersByType } from '../mocks/destinations.js';


export default class ListPresenter {
  listComponent = new ListView;

  constructor({listConteiner, destinationsModel}) {
    this.listConteiner = listConteiner;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.destinationsList = [...this.destinationsModel.getDestinations()];
    render(new SortView, this.listComponent.getElement());
    render(this.listComponent, this.listConteiner);
    render(new NewFormView({trip: this.destinationsList[0], allOffers: offersByType}), this.listComponent.getElement());
    // render(new EditView({trip: this.destinationsList[1]}), this.listComponent.getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < this.destinationsList.length; i++) {
      render(new PointView({trip: this.destinationsList[i], allOffers: offersByType}), this.listComponent.getElement(), RenderPosition.AFTEREND);
    }
  }

}
