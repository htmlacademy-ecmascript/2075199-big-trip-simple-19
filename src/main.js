import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButton from './view/new-point-button-view.js';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({filterContainer: siteControlsElement, filterModel, pointsModel});
const listPresenter = new ListPresenter({listContainer: siteTripElement, filterModel, pointsModel, onNewPointDestroy: handleNewPointFormClose});


const newPointButtonElement = new NewPointButton({
  onClick: handleNewTaskButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonElement.element.disabled = false;
}

function handleNewTaskButtonClick() {
  listPresenter.createPoint();
  newPointButtonElement.element.disabled = true;
}

filterPresenter.init();
listPresenter.init();
