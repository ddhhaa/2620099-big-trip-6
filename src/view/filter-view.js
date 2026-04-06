import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate(filters){

  const filterTemplate = filters.map(({type, count}, index) =>
    `<div class="trip-filters__filter">
      <input
      id="filter-${type}"
      class="trip-filters__filter-input
      visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${index === 0 ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type[0].toUpperCase() + type.slice(1)}</label>
    </div>
  `).join('');

  return `
          <form class="trip-filters" action="#" method="get">
              ${filterTemplate}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
        `;
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
