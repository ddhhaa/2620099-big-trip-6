import { TYPE_POINTS } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createEditFormTemplate(point = {}, destinations = [], offers = []){
  const {
    type = TYPE_POINTS[0],
    destination: destinationId = '',
    dateFrom = new Date(),
    dateTo = new Date(),
    basePrice = 0,
    offers: selectedOfferIds = [],
  } = point;

  const selectedDestination = destinations.find((dest) => dest.id === destinationId);

  const safeDateFrom = dateFrom ? new Date(dateFrom) : new Date();
  const safeDateTo = dateTo ? new Date(dateTo) : new Date();
  const dateFromFormated = flatpickr.formatDate(safeDateFrom, 'd/m/y H:i');
  const dateToFormated = flatpickr.formatDate(safeDateTo, 'd/m/y H:i');

  const offersByType = Object.fromEntries(
    offers.map((item) => [item.type, item.offers])
  );
  const typeOffers = offersByType[type] || [];
  const offersTemplate = typeOffers.map((offer, index) => {
    const isChecked = selectedOfferIds.includes(offer.id);
    const safeTitle = he.encode(offer.title);
    const safePrice = he.encode(String(offer.price));

    return `

      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden"
          id="${safeTitle}-${index}"
          type="checkbox"
          name="${safeTitle}"
          ${isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="${safeTitle}-${index}">
          <span class="event__offer-title">${safeTitle}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${safePrice}</span>
        </label>
      </div>
    `;
  }).join('');

  const destinationPhotosTemplate =
    selectedDestination &&
    selectedDestination.pictures &&
    selectedDestination.pictures.length > 0
      ? selectedDestination.pictures.map((picture) => `
          <img
            class="event__photo"
            src="${he.encode(picture.src)}"
            alt="${he.encode(picture.description)}"
          >
        `).join('')
      : '';

  const destinationsTemplate = destinations.map((dest) => `
    <option value="${he.encode(dest.name)}"></option>
  `).join('');

  const eventTypeTemplate = TYPE_POINTS.map((eventType) =>
    `<div class="event__type-item">
                  <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
                  <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType[0].toUpperCase() + eventType.slice(1)}</label>
                </div>`).join('');


  return `
            <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post" autocomplete="off">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${he.encode(type)}.png" alt="${he.encode(type)} icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypeTemplate}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">${type[0].toUpperCase() + type.slice(1)}</label>
            <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${selectedDestination ? selectedDestination.name : ''}" list="destination-list-1">
            <datalist id="destination-list-1">
            ${destinationsTemplate}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromFormated}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToFormated}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${selectedDestination ? selectedDestination.description : ''}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${destinationPhotosTemplate}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
        `;
}

export default class EditFormView extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleArrowClick = null;
  #handleDeleteClick = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({point, destinations, offers, onFormSubmit, onArrowClick, onDeleteClick}) {
    super();

    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleArrowClick = onArrowClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this._setState({
      ...point,
    });
    this.#setEventListeners();

    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  get template() {
    return createEditFormTemplate(
      this._state,
      this.#destinations,
      this.#offers
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#arrowClickHandler);

    this.#setTypeChangeHandler();
    this.#setDestinationChangeHandler();
  }

  #setEventListeners() {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#arrowClickHandler);

    this.element
      .querySelector('.event--edit')
      .addEventListener('submit',this.#formSubmitHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);

    this.#setTypeChangeHandler();
    this.#setDestinationChangeHandler();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #arrowClickHandler = () => {
    this.#handleArrowClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };

  #setTypeChangeHandler() {
    const typeGroup = this.element.querySelector('.event__type-group');
    typeGroup.addEventListener('change', (evt) => {
      if (evt.target.name === 'event-type') {
        evt.preventDefault();
        const newType = evt.target.value;

        this.updateElement({
          type: newType,
          offers: []
        });
      }
    });
  }


  #setDestinationChangeHandler() {
    const destinationInput = this.element.querySelector('.event__input--destination');
    destinationInput.addEventListener('change', (evt) => {
      evt.preventDefault();
      const destinationName = evt.target.value;

      const selectedDest = this.#destinations.find(
        (dest) => dest.name === destinationName
      );

      if (selectedDest) {
        this.updateElement({
          destination: selectedDest.id
        });
      } else {
        this.updateElement({
          destination: ''
        });
      }
    });
  }

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #setDatepickerStart() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo,
      }
    );
  }

  #setDatepickerEnd() {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom,
      }
    );
  }
}
