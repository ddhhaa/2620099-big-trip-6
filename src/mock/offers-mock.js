import { getRandomArrayElement } from '../utils/common.js';

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      { id: 'offer-1', title: 'Business class', price: 50 },
      { id: 'offer-2', title: 'Radio station', price: 30 },
      { id: 'offer-3', title: 'Drive quickly', price: 100 }
    ]
  },
  {
    type: 'bus',
    offers: [
      { id: 'offer-4', title: 'Infotainment', price: 40 },
      { id: 'offer-5', title: 'Order meal', price: 60 }
    ]
  },
  {
    type: 'train',
    offers: [
      { id: 'offer-6', title: 'Breakfast', price: 80 },
      { id: 'offer-7', title: 'Business seat', price: 120 }
    ]
  },
  {
    type: 'flight',
    offers: [
      { id: 'offer-8', title: 'Economy', price: 50 },
      { id: 'offer-9', title: 'Business', price: 150 },
      { id: 'offer-10', title: 'Add luggage', price: 70 }
    ]
  },
  {
    type: 'check-in',
    offers: [
      { id: 'offer-11', title: 'Breakfast', price: 90 },
      { id: 'offer-12', title: 'Laundry', price: 100 }
    ]
  },
  {
    type: 'ship',
    offers: [
      { id: 'offer-13', title: 'Business class', price: 200 },
      { id: 'offer-14', title: 'Add luggage', price: 80 }
    ]
  },
  {
    type: 'drive',
    offers: [
      { id: 'offer-15', title: 'Automatic', price: 50 },
      { id: 'offer-16', title: 'Air conditioning', price: 70 }
    ]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'restaurant',
    offers: [
      { id: 'offer-17', title: 'Live music', price: 90 },
      { id: 'offer-18', title: 'VIP area', price: 150 }
    ]
  }
];

function getRandomOffer() {
  return getRandomArrayElement(mockOffers);
}

export { getRandomOffer, mockOffers };
