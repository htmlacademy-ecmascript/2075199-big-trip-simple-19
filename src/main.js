import {render} from './render';
import FilterView from '../src/view/filters-view.js';
import ListPresenter from './presenter/list-presenter.js';

const filterElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');
const listPresenter = new ListPresenter({listConteiner: eventsElement});

render(new FilterView, filterElement);

listPresenter.init();
