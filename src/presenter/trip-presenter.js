import SortView from '../view/sort-view.js';
import { render, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import NoPointsView from '../view/no-points-view.js';
import EventListView from '../view/event-list-view.js';
import {updateItem} from '../utils/common.js';
import { SortType } from '../const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/sort.js';

const POINT_COUNT_PER_STEP = 8;

export default class TripPresenter {
  #tripContainer = null;
  #filterContainer = null;
  #eventsContainer = null;

  #sortComponent = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];

  #pointPresenters = new Map();
  #renderedPointCount = POINT_COUNT_PER_STEP;

  #activePresenter = null;

  #currentSortType = SortType.DAY;

  #eventListComponent = null;
  #sourcedPointsList = [];

  constructor({tripContainer, pointsModel, offersModel, destinationsModel}) {
    this.#tripContainer = tripContainer;
    this.#eventsContainer = document.querySelector('.trip-events');
    this.#sortComponent = null;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#points].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#points].sort(sortByPrice);
    }

    return [...this.#points].sort(sortByDay);
  }

  init() {
    this.#renderSort();
    this.#loadPoints();

    if (!this.#points || this.#points.length === 0) {
      render(new NoPointsView(), this.#eventsContainer);
      return;
    }
    this.#sourcedPointsList = [...this.#pointsModel.points];
    this.#renderPoints();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#eventsContainer);
  }

  #loadPoints() {
    this.#points = [...this.#pointsModel.points];
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPointsList = updateItem(this.#sourcedPointsList, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = (currentPresenter) => {
    if (this.#activePresenter && this.#activePresenter !== currentPresenter) {
      this.#activePresenter.resetView();
    }
    this.#activePresenter = currentPresenter;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    this.#sortComponent.element.remove();
    this.#renderSort();

    this.#clearPointsList();
    this.#renderPoints();
  };

  #renderPoints() {
    this.#eventListComponent = new EventListView();
    render(this.#eventListComponent, this.#eventsContainer);
    const points = [...this.points];
    const pointsListContainer = this.#eventListComponent.element;

    this.#resetPointsView();

    points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container: pointsListContainer,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        onDataChange: this.#handlePointChange,
        onModeChange: this.#handleModeChange
      });

      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #renderNoPoints() {
    render(new NoPointsView(), this.#eventsContainer);
  }

  #resetPointsView = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#eventListComponent);
    this.#renderedPointCount = POINT_COUNT_PER_STEP;
  }
}
