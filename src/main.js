import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteMainElement = document.querySelector('.trip-main');
const newPointButtonComponent = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter({
  tripContainer:siteMainElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteMainElement,
  filterModel,
  pointsModel
});


function handleNewPointFormClose() {
  newPointButtonComponent.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.disabled = true;
}

newPointButtonComponent.addEventListener('click', handleNewPointButtonClick);

filterPresenter.init();
tripPresenter.init();
