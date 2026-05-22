import { FilterType } from '../const';
import { isFuturePoint, isPastPoint, isPresentPoint } from './tasks';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => !point.isArchive),
  [FilterType.FUTURE]: (points) => points.filter((point) => !point.isArchive && isFuturePoint(point.dueDate)),
  [FilterType.PAST]: (points) => points.filter((point) => !point.isArchive && isPastPoint(point.dueDate)),
  [FilterType.PRESENT]: (points) => points.filter((point) => !point.isArchive && isPresentPoint(point.dueDate)),
};

export {filter};
