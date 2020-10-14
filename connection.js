class Connection {
  constructor(city1, city2) {
    this.city1 = city1;
    this.city2 = city2;

    this.color = color(28, 186, 176);
    this.strokeWeight = 2;

    this.pheromones = 0;
    this.newPheromones = 0;
  }

  drawConnection() {
    stroke(this.color);
    strokeWeight(this.strokeWeight);
    line(this.city1.xPos, this.city1.yPos, this.city2.xPos, this.city2.yPos);
  }

  isEqual(otherConnection) {
    return ((this.city1 == otherConnection.city1
                && this.city2 == otherConnection.city2) ||
            (this.city1 == otherConnection.city2
                && this.city2 == otherConnection.city1));
  }

  deleteConnection() {
    this.city1.removeConnection(this);
    this.city2.removeConnection(this);
  }

  recievePheromone(pheromones) {
    this.newPheromones += pheromones;
  }

  updatePheromone() {
    //pass
  }
}
