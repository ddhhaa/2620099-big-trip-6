import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import {render, replace} from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #filterContainer = null;
  #eventsContainer = null;

  #filterComponent = null;
  #sortComponent = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];

  constructor({tripContainer, pointsModel, offersModel, destinationsModel}){
    this.#tripContainer = tripContainer;
    this.#filterContainer = document.querySelector('.trip-controls__filters');
    this.#eventsContainer = document.querySelector('.trip-events');


    this.#filterComponent = new FilterView();
    this.#sortComponent = new SortView();

    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init(){
    render(this.#filterComponent, this.#filterContainer);
    render(this.#sortComponent, this.#eventsContainer);

    this.#points = [...this.#pointsModel.pointsList];

    for (let i = 0; i < this.#points.length;i++){
      const point = this.#points[i];
      this.#renderPoint(point);
    }

  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape'){
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown',escKeyDownHandler);
      }
    };

    const closeHandler = () => {
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const pointComponent = new PointView({
      point: point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      typeOffers: this.#offersModel.getOffersByType(point.type),
      onArrowClick: () => {
        replacePointToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditFormView({
      point: point,
      destinations: this.#destinationsModel.getDestinations(),
      offers: this.#offersModel.getOffers(),
      onFormSubmit: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onArrowClick: closeHandler
    });

    function replaceEditToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    function replacePointToEdit() {
      replace(pointEditComponent, pointComponent);
    }

    render(pointComponent, this.#eventsContainer);
  }
}
