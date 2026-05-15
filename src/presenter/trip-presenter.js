import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import NoPointsView from '../view/no-points-view.js';
import EventListView from '../view/event-list-view.js';
import {updateItem} from '../utils/common.js';

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


  eventListComponent = new EventListView();

  constructor({tripContainer, pointsModel, offersModel, destinationsModel}) {
    this.#tripContainer = tripContainer;
    this.#eventsContainer = document.querySelector('.trip-events');
    this.#sortComponent = new SortView();
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }


  init() {
    this.#renderSort();
    this.#loadPoints();

    if (!this.#points || this.#points.length === 0) {
      render(new NoPointsView(), this.#eventsContainer);
      return;
    }
    this.#renderPoints();
  }

  #renderSort() {
    render(this.#sortComponent, this.#eventsContainer);
  }

  #loadPoints() {
    this.#points = [...this.#pointsModel.pointsList];
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = (currentPresenter) => {
    if (this.#activePresenter && this.#activePresenter !== currentPresenter) {
      this.#activePresenter.resetView();
    }
    this.#activePresenter = currentPresenter;
  };

  #renderPoints() {
    render(this.eventListComponent, this.#eventsContainer);
    const points = [...this.#pointsModel.pointsList];
    const pointsListContainer = this.eventListComponent.element;

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

  #resetPointsView = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#renderedPointCount = POINT_COUNT_PER_STEP;
  }
}
