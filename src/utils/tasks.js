import { DESCRIPTION,
  imgPlug
} from '../const';
import dayjs from 'dayjs';


const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function getRandomDescription(){
  const sentenceCount = getRandomInteger(3,5) + 3;
  const selectedSentences = [];

  for (let i = 0; i < sentenceCount; i++) {
    const randomIndex = Math.floor(Math.random() * DESCRIPTION.length);
    selectedSentences.push(DESCRIPTION[randomIndex]);
  }
  return selectedSentences.join(' ');
}

function getRandomPhotos(count) {
  const photos = [];
  const usedNumbers = new Set();

  for (let i = 0; i < count; i++) {
    let randomNumber;
    do {
      randomNumber = getRandomInteger(1, 1000);
    } while (usedNumbers.has(randomNumber));

    usedNumbers.add(randomNumber);
    photos.push(imgPlug + randomNumber.toString());
  }

  return photos;
}

const calculateDuration = (dateFrom, dateTo) => {
  const durationInMinutes = Math.floor((dateTo - dateFrom) / (1000 * 60));
  const hours = Math.floor((durationInMinutes / 60) % 24);
  const days = Math.floor(durationInMinutes / 1440);
  const minutes = durationInMinutes % 60;

  if (!dateFrom || !dateTo) {
    return '0H 0M';
  }
  if (days > 0){
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }
  if (hours > 0){
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }

  return `${hours}H ${minutes}M`;

};


const formatTime = (date) => date.toTimeString().slice(0, 5);


const formatDateTime = (date) => date.toISOString().slice(0, 16);

function isFuturePoint(dueDate) {
  return dueDate && dayjs().isBefore(dueDate, 'D');
}

function isPastPoint(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isPresentPoint(dueDate){
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

export {getRandomDescription,
  getRandomPhotos,
  formatTime,
  formatDateTime,
  calculateDuration,
  isFuturePoint,
  isPastPoint,
  isPresentPoint
};
