class Ant {
  construction(startCity, nbCities) {
    this.startCity = startCity;
    this.visitedCities = [startCity];
    this.traveledConnections = [];
    this.currentCity = startCity;
    this.nbCities = nbCities;

    this.cost = 0;
    this.finished = false;
  }

  getTotalCost() {
    return this.cost;
  }

  isFinished() {
    return this.finished;
  }

  hadSuccesfulWalk() {
    return (
      this.isFinished()
      && this.visitedCities.length == this.nbCities
      && this.currentCity == this.startCity
    );
  }

  walk() {
    let connection = this.selectConnection();
    this.travelConnection(connection);
  }

  selectConnection() {
    //pass
  }

  travelConnection(connection) {
    //pass
  }

  dropPheromones() {
    if (!this.hadSuccesfulWalk()) {
      console.log("ANT | dropping pheromone whithout succesfull walk!");
    }

    //TODO: drop pheromones at each connection
  }
}
