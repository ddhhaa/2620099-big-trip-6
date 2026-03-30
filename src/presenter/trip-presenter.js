import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render } from '../render.js';

export default class TripPresenter{
  constructor({tripContainer, pointsModel, offersModel, destinationsModel}){
    this.tripContainer = tripContainer;
    this.filterConteiner = document.querySelector('.trip-controls__filters');
    this.eventsConteiner = document.querySelector('.trip-events');


    this.filterComponent = new FilterView();
    this.sortComponent = new SortView();

    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init(){
    this.points = [...this.pointsModel.getPoints()];

    render(this.filterComponent, this.filterConteiner);
    render(this.sortComponent, this.eventsConteiner);

    for (let i = 0; i < this.points.length;i++){
      const point = this.points[i];

      render(new PointView({
        point: point,
        destination: this.destinationsModel.getDestinationById(this.points[i].destination),
        typeOffers: this.offersModel.getOffersByType(this.points[i].type)
      }),
      this.eventsConteiner);


      if (i === 0) {
        const editForm = new EditFormView({
          point: point,
          destinations: this.destinationsModel.getDestinations(),
          offers: this.offersModel.getOffers()
        });
        render(editForm, this.eventsConteiner);
      }
    }

  }
}
