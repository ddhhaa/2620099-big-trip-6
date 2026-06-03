import SortView from '../view/sort-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import NoPointsView from '../view/no-points-view.js';
import EventListView from '../view/event-list-view.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';

const POINT_COUNT_PER_STEP = 8;

export default class TripPresenter {
  #tripContainer = null;
  #filterContainer = null;
  #eventsContainer = null;

  #sortComponent = null;
  #eventListComponent = null;
  #noPointComponent = null;
  #loadingComponent = new LoadingView();

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #activePresenter = null;

  #renderedPointCount = POINT_COUNT_PER_STEP;
  #isLoading = true;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({tripContainer, pointsModel, offersModel, destinationsModel, filterModel}) {
    this.#tripContainer = tripContainer;
    this.#eventsContainer = document.querySelector('.trip-events');
    this.#sortComponent = null;

    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints.sort(sortByDay);
  }

  init() {
    this.#renderSort();
    this.#renderPoints();
  }

  createPoint() {
    if (this.#newPointPresenter !== null) {
      return;
    }

    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointDestroy
    });

    this.#newPointPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsContainer);
  }

  #handleModeChange = (currentPresenter) => {
    if (this.#newPointPresenter) {
      this.#newPointPresenter.destroy();
    }

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

    remove(this.#sortComponent);
    this.#renderSort();

    this.#clearPointsList();
    this.#renderPoints();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;

      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;

      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderPoints();
        break;

      case UpdateType.MAJOR:
        this.#clearPointsList();
        this.#renderPoints();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPoints();
        break;
    }
  };

  #handleNewPointDestroy = () => {
    this.#newPointPresenter = null;
  };

  #renderPoints() {
    if (this.#isLoading) {
      this.#eventListComponent = new EventListView();
      render(this.#eventListComponent, this.#eventsContainer);

      this.#renderLoading();
      return;
    }

    const points = [...this.points];

    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#eventListComponent = new EventListView();
    render(this.#eventListComponent, this.#eventsContainer);

    const pointsListContainer = this.#eventListComponent.element;

    this.#resetPointsView();

    points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container: pointsListContainer,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        onDataChange: this.#handleViewAction,
        onModeChange: this.#handleModeChange
      });

      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointsView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#eventsContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #resetPointsView = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#eventListComponent);
    remove(this.#loadingComponent);

    this.#renderedPointCount = POINT_COUNT_PER_STEP;

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
  }
}
