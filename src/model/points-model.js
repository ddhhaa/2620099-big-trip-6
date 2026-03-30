import { mockPoints } from '../mock/points-mock.js';

export default class PointsModel {
  points = mockPoints;

  getPoints() {
    return this.points;
  }
}
