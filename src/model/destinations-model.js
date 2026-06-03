export default class DestinationsModel {
  #destinations = [];
  #destinationsApiService = null;

  constructor({ destinationsApiService }) {
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    this.#destinations = await this.#destinationsApiService.destinations;
  }

  getDestinationById(id) {
    return this.#destinations.find((item) => item.id === id);
  }
}
