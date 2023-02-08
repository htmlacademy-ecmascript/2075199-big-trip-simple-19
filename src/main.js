import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButton from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';

const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';
const AUTHORIZATION = 'Basic eodknsdfjgsdk98';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
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
pointsModel.init();
