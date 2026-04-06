import {render} from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import {generateFilter} from './mock/filter.js';
import FilterView from './view/filter-view.js';

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

const filters = generateFilter(pointsModel.pointsList);

render(new FilterView({filters}), siteMainElement);


tripPresenter.init();
