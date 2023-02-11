import AbstractView from '../framework/view/abstract-view';

const createServerErorrTemplate = () => ('<p class="trip-events__msg">Server is not available.</p>');


export default class ServerErrorView extends AbstractView {
  get template() {
    return createServerErorrTemplate();
  }
}
