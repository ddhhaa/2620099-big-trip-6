import { mockOffers } from '../mock/offers-mock.js';

export default class OffersModel {
  #offers = mockOffers;

  getOffers() {
    return this.#offers;
  }

  getOffersByType(type) {
    const offers = this.#offers.find((o) => o.type === type);
    return offers ? offers.offers : [];
  }

  getOffersById(type, itemsId){
    const offers = this.getOffersByType(type);
    return offers.filter((item) => itemsId.find((id) => item.id === id));
  }
}
