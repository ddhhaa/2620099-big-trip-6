import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    id: '1',
    type: 'taxi',
    destination: 'amsterdam',
    dateFrom: '2024-08-15T10:00:00.000Z',
    dateTo: '2024-08-15T11:30:00.000Z',
    basePrice: 50,
    offers: ['offer-1', 'offer-2'],
    isFavorite: false
  },
  {
    id: '2',
    type: 'flight',
    destination: 'paris',
    dateFrom: '2024-08-16T08:00:00.000Z',
    dateTo: '2024-08-16T10:00:00.000Z',
    basePrice: 150,
    offers: ['offer-8', 'offer-9'],
    isFavorite: true
  },
  {
    id: '3',
    type: 'train',
    destination: 'chamonix',
    dateFrom: '2024-08-17T14:30:00.000Z',
    dateTo: '2024-08-17T18:00:00.000Z',
    basePrice: 80,
    offers: ['offer-6'],
    isFavorite: false
  },
  {
    id: '4',
    type: 'check-in',
    destination: 'london',
    dateFrom: '2024-08-18T15:00:00.000Z',
    dateTo: '2024-08-20T12:00:00.000Z',
    basePrice: 200,
    offers: ['offer-11'],
    isFavorite: true
  },
  {
    id: '5',
    type: 'ship',
    destination: 'venice',
    dateFrom: '2024-08-21T09:00:00.000Z',
    dateTo: '2024-08-21T17:00:00.000Z',
    basePrice: 120,
    offers: ['offer-13'],
    isFavorite: false
  },
  {
    id: '6',
    type: 'bus',
    destination: 'rome',
    dateFrom: '2024-08-22T11:00:00.000Z',
    dateTo: '2024-08-22T13:30:00.000Z',
    basePrice: 40,
    offers: ['offer-4', 'offer-5'],
    isFavorite: false
  },
  {
    id: '7',
    type: 'sightseeing',
    destination: 'barcelona',
    dateFrom: '2024-08-23T10:00:00.000Z',
    dateTo: '2024-08-23T12:00:00.000Z',
    basePrice: 30,
    offers: [],
    isFavorite: true
  },
  {
    id: '8',
    type: 'drive',
    destination: 'berlin',
    dateFrom: '2024-08-24T09:00:00.000Z',
    dateTo: '2024-08-24T11:00:00.000Z',
    basePrice: 60,
    offers: ['offer-15', 'offer-16'],
    isFavorite: false
  },
  {
    id: '9',
    type: 'restaurant',
    destination: 'prague',
    dateFrom: '2024-08-25T19:00:00.000Z',
    dateTo: '2024-08-25T21:00:00.000Z',
    basePrice: 90,
    offers: ['offer-17'],
    isFavorite: true
  },
  {
    id: '10',
    type: 'flight',
    destination: 'vienna',
    dateFrom: '2024-08-26T07:00:00.000Z',
    dateTo: '2024-08-26T09:00:00.000Z',
    basePrice: 180,
    offers: ['offer-8', 'offer-10'],
    isFavorite: false
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { mockPoints, getRandomPoint };
