import { getRandomPoint } from '../mock/points-mock.js';

const POINTS_COUNT = 15;

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  get pointsList() {
    return this.#points;
  }
}
