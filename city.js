const CityStatus = {
  NORMAL: 'normal',
  HOVER: 'hover',
  SELECTED: 'selected',
  DOUBLE: 'doubleSelected'
}

class City {
  static color;
  static strokeColor;
  static doubleClickStrokeColor;
  static strokeWeight = 4;
  static radius = 10;
  static largeRadius = 13;

  static setColor(newColor) {
    City.color = newColor;
  }

  static setStrokeColor(newColor) {
    City.strokeColor = newColor;
  }

  static setDoubleClickStrokeColor(newColor) {
    City.doubleClickStrokeColor = newColor;
  }

  static setStrokeWeight(newWeight) {
    City.strokeWeight = newWeight;
  }

  static setRadius(newRadius) {
    City.radius = newRadius;
  }

  static setLargeRadius(newRadius) {
    City.largeRadius = newRadius;
  }

  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;

    this.connections = []
    this.status = CityStatus.NORMAL;
  }

  withinArea(x, y, margin = 0) {
    return (
      this.distanceToPoint(x, y) - City.largeRadius <= margin
    );
  }

  distanceToPoint(x, y) {
    return sqrt(
      pow(this.xPos - x, 2) +
      pow(this.yPos - y, 2)
    );
  }

  updatePosition(newX, newY) {
    this.xPos = newX;
    this.yPos = newY;
  }

  isNormal() {
    return (
      this.status == CityStatus.NORMAL
    );
  }

  isSelected() {
    return (
      this.status == CityStatus.SELECTED
    );
  }

  isDoubleSelected() {
    return (
      this.status == CityStatus.DOUBLE
    );
  }

  isHovered() {
    return (
      this.status == CityStatus.HOVER
    );
  }

  setToNormalState() {
    this.status = CityStatus.NORMAL;
  }

  setToHoverState() {
    if (!(this.isSelected() || this.isDoubleSelected())) {
      this.status = CityStatus.HOVER;
    } else {
      console.log(
        "Hover state not activated when (double) selected!"
      );
    }
  }

  click() {
    if (this.isSelected()) {
      this.status = CityStatus.DOUBLE;
    } else if (this.isDoubleSelected()) {
      this.status = CityStatus.NORMAL;
    } else {
      this.status = CityStatus.SELECTED;
    }
  }

  changeHover(hover) {
    this.hover = hover;
  }

  changeClicked(clicked) {
    if (clicked) {
      this.doubleSelected = false;
    }
    this.selected = clicked;
  }

  changeDoubleClicked(clicked) {
    if (clicked) {
      this.selected = false;
    }
    this.doubleSelected = clicked;
  }

  withinArea(xPos, yPos) {
    return (this.distanceToPoint(xPos, yPos) <= this.largeRadius);
  }

  drawCity() {
    strokeWeight(City.strokeWeight);
    fill(City.color);

    if (this.isSelected()) {
      stroke(City.strokeColor);
      circle(this.xPos, this.yPos, 2 * City.largeRadius);
    } else if (this.isDoubleSelected()) {
      stroke(City.doubleClickStrokeColor);
      circle(this.xPos, this.yPos, 2 * City.largeRadius);
    } else {
      noStroke();
      if (this.isHovered()) {
        circle(this.xPos, this.yPos, 2 * City.largeRadius);
      } else {
        circle(this.xPos, this.yPos, 2 * City.largeRadius);
      }
    }
  }

  getConnections() {
    return this.connections;
  }

  addConnection(connection) {
    console.assert(
      connection.hasCity(this),
      {
        connection: connection,
        errorMsg: 'Connection does not contain this city..'
      }
    )
    this.connections.push(connection);
  }

  removeConnection(connectionToRemove) {
    console.assert(
      connection.hasCity(this),
      {
        connection: connectionToRemove,
        errorMsg: 'Connection does not link to this city..'
      }
    );
    this.connections = this.connections.filter(
      connection => connection != connectionToRemove
    );
  }
}
