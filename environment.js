class Environment {
    constructor() {
        this.cities = []
        this.connections = []
    }

    getCities() {
        return this.cities;
    }

    getNormalCities() {
        return this.cities.filter(
            city => city.isNormal()
        );
    }

    getHoveredCities() {
        return this.cities.filter(
            city => city.isHovered()
        );
    }

    getSelectedCities() {
        return this.cities.filter(
            city => city.isSelected()
        );
    }

    getDoubleSelectedCities() {
        return this.cities.filter(
            city => city.isDoubleSelected()
        );
    }

    addCity(x, y) {
        this.cities.push(
            new City(x, y)
        );
    }

    deleteCity(toRemove) {
        this.cities = this.cities.filter(
            city => city != toRemove
        )
    }

    getConnections() {
        return this.connections
    }

    addConnection(city1, city2) {
        const connection = new Connection(city1, city2);
        city1.addConnection(connection);
        city2.addConnection(connection);
        this.connections.push(
            connection
        );
    }

    removeConnection(toRemove) {
        this.connections = this.connections.filter(
            connection => connection != toRemove
        );
    }

    draw(maxPheromones) {
        this.connections.map(connection => {
            connection.drawConnection(maxPheromones);
        });

        this.cities.map(city => {
            city.drawCity();
        })
    }
}