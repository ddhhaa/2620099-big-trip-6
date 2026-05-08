import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import NoPointsView from '../view/no-points-view.js';
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

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoints() {
    const points = [...this.#pointsModel.pointsList];

    points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container: this.#eventsContainer,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        onDataChange: this.#handlePointChange,
        onModeChange: this.#handleModeChange
      });

      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#renderedPointCount = POINT_COUNT_PER_STEP;
  }
}
