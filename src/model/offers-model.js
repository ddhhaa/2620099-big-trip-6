export default class OffersModel {
  #offers = [];
  #offersApiService = null;

  constructor({ offersApiService }) {
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#offersApiService.offers;
  }

  getOffersByType(type) {
    const offers = this.#offers.find((o) => o.type === type);
    return offers ? offers.offers : [];
  }

  getOffersById(type, itemsId) {
    const offers = this.getOffersByType(type);
    return offers.filter((item) =>
      itemsId.includes(item.id)
    );
  }
}
