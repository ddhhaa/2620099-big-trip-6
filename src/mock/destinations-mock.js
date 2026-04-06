import { getRandomPhotos, getRandomDescription } from '../utils/tasks.js';
import { getRandomArrayElement } from '../utils/common.js';

const mockDestinations = [
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    photos: getRandomPhotos(5),
    description: getRandomDescription()
  },
  {
    id: 'paris',
    name: 'Paris',
    photos: getRandomPhotos(1),
    description: getRandomDescription()
  },
  {
    id: 'chamonix',
    name: 'Chamonix',
    photos: getRandomPhotos(2),
    description: getRandomDescription()
  },
  {
    id: 'london',
    name: 'London',
    photos: getRandomPhotos(3),
    description: getRandomDescription()
  },
  {
    id: 'rome',
    name: 'Rome',
    photos: getRandomPhotos(2),
    description: getRandomDescription()
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    photos: getRandomPhotos(1),
    description: getRandomDescription()
  },
  {
    id: 'berlin',
    name: 'Berlin',
    photos: getRandomPhotos(2),
    description: getRandomDescription()
  },
  {
    id: 'prague',
    name: 'Prague',
    photos: getRandomPhotos(2),
    description: getRandomDescription()
  },
  {
    id: 'vienna',
    name: 'Vienna',
    photos: getRandomPhotos(1),
    description: getRandomDescription()
  },
  {
    id: 'venice',
    name: 'Venice',
    photos: getRandomPhotos(2),
    description: getRandomDescription()
  }
];

function getRandomDestination() {
  return getRandomArrayElement(mockDestinations);
}

export { getRandomDestination, mockDestinations };
