import { getRandomArrayElement } from '../utils/common.js';
import {nanoid} from 'nanoid';

const mockPoints = [
  {
    id: '1',
    type: 'taxi',
    destination: 'amsterdam',
    dateFrom: '2026-05-20T10:00:00.000Z',
    dateTo: '2026-05-20T11:30:00.000Z',
    basePrice: 50,
    offers: ['offer-1', 'offer-2'],
    isFavorite: false
  },
  {
    id: '2',
    type: 'flight',
    destination: 'paris',
    dateFrom: '2026-05-21T08:00:00.000Z',
    dateTo: '2026-05-21T10:00:00.000Z',
    basePrice: 150,
    offers: ['offer-8', 'offer-9'],
    isFavorite: true
  },
  {
    id: '3',
    type: 'train',
    destination: 'chamonix',
    dateFrom: '2026-05-25T14:30:00.000Z',
    dateTo: '2026-05-25T18:00:00.000Z',
    basePrice: 80,
    offers: ['offer-6'],
    isFavorite: false
  },
  {
    id: '4',
    type: 'check-in',
    destination: 'london',
    dateFrom: '2026-05-25T15:00:00.000Z',
    dateTo: '2026-05-26T12:00:00.000Z',
    basePrice: 200,
    offers: ['offer-11'],
    isFavorite: true
  },
  {
    id: '5',
    type: 'ship',
    destination: 'venice',
    dateFrom: '2026-05-27T09:00:00.000Z',
    dateTo: '2026-05-27T17:00:00.000Z',
    basePrice: 120,
    offers: ['offer-13'],
    isFavorite: false
  },
  {
    id: '6',
    type: 'bus',
    destination: 'rome',
    dateFrom: '2026-05-28T11:00:00.000Z',
    dateTo: '2026-05-28T13:30:00.000Z',
    basePrice: 40,
    offers: ['offer-4', 'offer-5'],
    isFavorite: false
  },
  {
    id: '7',
    type: 'sightseeing',
    destination: 'barcelona',
    dateFrom: '2026-05-24T10:00:00.000Z',
    dateTo: '2026-05-24T12:00:00.000Z',
    basePrice: 30,
    offers: [],
    isFavorite: true
  },
  {
    id: '8',
    type: 'drive',
    destination: 'berlin',
    dateFrom: '2026-05-30T09:00:00.000Z',
    dateTo: '2026-05-30T11:00:00.000Z',
    basePrice: 60,
    offers: ['offer-15', 'offer-16'],
    isFavorite: false
  },
  {
    id: '9',
    type: 'restaurant',
    destination: 'prague',
    dateFrom: '2026-05-25T19:00:00.000Z',
    dateTo: '2026-05-25T21:00:00.000Z',
    basePrice: 90,
    offers: ['offer-17'],
    isFavorite: true
  },
  {
    id: '10',
    type: 'flight',
    destination: 'vienna',
    dateFrom: '2026-06-02T07:00:00.000Z',
    dateTo: '2026-06-02T09:00:00.000Z',
    basePrice: 180,
    offers: ['offer-8', 'offer-10'],
    isFavorite: false
  }
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export { mockPoints, getRandomPoint };
