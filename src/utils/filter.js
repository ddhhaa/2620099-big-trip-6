import { FilterType } from '../const';
import { isFuturePoint, isPastPoint, isPresentPoint } from './tasks';

const filter = {
  [FilterType.EVERYTHING]: (tasks) => tasks.filter((task) => !task.isArchive),
  [FilterType.FUTURE]: (tasks) => tasks.filter((task) => !task.isArchive && isFuturePoint(task.dueDate)),
  [FilterType.PAST]: (tasks) => tasks.filter((task) => !task.isArchive && isPastPoint(task.dueDate)),
  [FilterType.PRESENT]: (tasks) => tasks.filter((task) => !task.isArchive && isPresentPoint(task.dueDate)),
};

export {filter};
