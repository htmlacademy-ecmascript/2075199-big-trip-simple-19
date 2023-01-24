import AbstractView from '../framework/view/abstract-view.js';


function createFilterTemplate (points) {

  const dateNow = Date.now();

  const disabledPoints = points.map((point) => {
    const currentDate = new Date(point.dateTo);
    const disabledDate = dateNow > currentDate.getTime() ? 'disabled' : 'included';
    return disabledDate;
  });
  const disabled = disabledPoints.find((disabledPoint) => disabledPoint === 'included') ? '' : 'disabled';

  return (`<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${disabled}>
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);
}

export default class FilterView extends AbstractView {
  #points = null;

  constructor({points}) {
    super();
    this.#points = points;
  }

  get template () {
    return createFilterTemplate(this.#points);
  }
}
