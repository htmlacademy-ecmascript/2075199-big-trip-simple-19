import { render } from './framework/render.js';
import FilterView from '../src/view/filters-view.js';
import ListPresenter from './presenter/list-presenter.js';
import DestinationsModel from './model/destination-model.js';

const filterElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');
const destinationsModel = new DestinationsModel();


const listPresenter = new ListPresenter({
  listConteiner: eventsElement,
  destinationsModel,
});

render(new FilterView, filterElement);

listPresenter.init();
