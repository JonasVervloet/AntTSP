class City {
  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
    this.selected = false;
    this.doubleSelected = false;
    this.hover = false;

    this.radius = 10;
    this.largeRadius = 13;
    this.spacing = 5;

    this.color = color(39, 201, 120);
    this.strokeColor = color(225, 59, 44);
    this.doubleClickStrokeColor = color(255, 250, 104);
    this.strokeWeight = 4;

    this.connections = []
  }

  overlap(otherCity) {
    return this.largeRadius + otherCity.largeRadius >= this.distanceToOtherCity(otherCity);
  }

  distanceToOtherCity(other) {
    return this.distanceToPoint(other.xPos, other.yPos);
  }

  distanceToPoint(otherX, otherY) {
    return sqrt(
      pow(this.xPos - otherX, 2) +
      pow(this.yPos - otherY, 2)
    );
  }

  changePosition(newXPos, newYPos) {
    this.xPos = newXPos;
    this.yPos = newYPos;
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
    strokeWeight(this.strokeWeight);
    fill(this.color);

    if (this.selected ) {
      stroke(this.strokeColor);
      circle(this.xPos, this.yPos, 2 * this.largeRadius);
    } else if (this.doubleSelected) {
      stroke(this.doubleClickStrokeColor);
      circle(this.xPos, this.yPos, 2 * this.largeRadius);
    } else {
      noStroke();
      if (this.hover) {
        circle(this.xPos, this.yPos, 2 * this.largeRadius);
      } else {
        circle(this.xPos, this.yPos, 2 * this.radius);
      }
    }
  }

  getConnections() {
    return this.connections;
  }

  addConnection(connection) {
    this.connections.push(connection);
  }

  removeConnection(connectionToRemove) {
    this.connections = this.connections.filter(
      connection => connection != connectionToRemove
    );
  }
}
