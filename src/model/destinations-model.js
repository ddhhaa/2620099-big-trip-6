import { mockDestinations} from '../mock/destinations-mock.js';

export default class DestinationsModel {
  #destinations = mockDestinations;

  getDestinations() {
    return this.#destinations;
  }

  getDestinationById(id){
    const destinationsType = this.getDestinations();
    return destinationsType.find((item) => item.id === id);
  }
}
