class EuclideanDistanceHeuristic {

  constructor(connection) {
    this.heuristic = getHeuristic(connection);
  }

  getEuclideanDistance(connection) {
    const firstPoint = connection.getFirstPoint();
    const secondPoint = connection.getSecondPoint();

    return sqrt(
      (firstPoint[0] - secondPoint[0]) ** 2 +
      (firstPoint[1] - secondPoint[1]) ** 2
    );
  }

  getHeuristic() {
    this.heuristic
  }
}
