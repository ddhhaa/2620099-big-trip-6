import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

const siteMainElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const tripPresenter = new TripPresenter({
  tripContainer:siteMainElement,
  pointsModel,
  offersModel,
  destinationsModel
});


tripPresenter.init();
