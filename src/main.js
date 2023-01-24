import { render } from './framework/render.js';
import { RenderPosition } from './framework/render.js';
import ListPresenter from './presenter/list-presenter.js';
import TripFiltersView from './view/filters-view.js';
import PointModel from './model/point-model.js';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const pointModel = new PointModel();
const listPresenter = new ListPresenter({container: siteTripElement, pointModel});

render (new TripFiltersView(), siteControlsElement, RenderPosition.BEFOREEND);

listPresenter.init();
