class Connection {
  static color;
  static strokeWeight = 3;

  static setColor(newColor) {
    Connection.color = newColor;
  }

  static setStrokeWeight(newWeight) {
    Connection.strokeWeight = newWeight;
  }

  constructor(city1, city2) {
    this.city1 = city1;
    this.city2 = city2;

    this.pheromones = 0;
    this.newPheromones = 0;
  }

  hasCity(otherCity) {
    return (this.city1 == otherCity || this.city2 == otherCity);
  }

  getOtherCity(otherCity) {
    console.assert(
      this.hasCity(otherCity),
      {
        city: otherCity,
        errorMsg: 'City is not linked by this connection...'
      }
    );
    if (otherCity == this.city1) {
      return this.city2;
    } else {
      return this.city1;
    }
  }

  drawConnection(maxPheromones) {
    const strokeColor = color(Connection.color);
    strokeColor.setAlpha(this.getSaturation(maxPheromones));
    stroke(strokeColor);
    strokeWeight(Connection.strokeWeight);
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

  getSaturation(maxPheromones) {
    // let saturation;
    // if (this.pheromones == 0) {
    //   saturation = random(256);
    // } else {
    //   saturation = int(255 * this.pheromones / maxPheromones);
    // }
    return 255;
  }
}
