class EventHandler {
    constructor() {
        this.playing = false;
        this.environment = new Environment();
    }

    update(mousePositionX, mousePositionY) {
        this.environment.draw();
    }

    handleMouseClick(mousePositionX, mousePositionY) {
        console.log("Handling mouse click!");
        this.environment.addCity(mousePositionX, mousePositionY);

        // if (withinFrame(mouseX, mouseY)) {
        //   cities.map(city => {
        //     if (city.withinArea(mouseX, mouseY)) {
        //       if (doubleSelectedCities.length == 1 &&
        //             doubleSelectedCities[0] == city) {
        //         city.changeDoubleClicked(false);
        //         doubleSelectedCities = [];
        //       } else if (selectedCities.length == 0) {
        //         selectedCities.push(city);
        //         city.changeClicked(true);
        //       } else if (selectedCities.length == 1) {
        //         if (selectedCities[0] == city) {
        //           doubleSelectedCities.push(city);
        //           selectedCities = [];
        //           city.changeDoubleClicked(true);
        //         } else {
        //           otherCity = selectedCities[0];
        //           selectedCities = [];

        //           otherCity.changeClicked(false);
        //           city.changeClicked(false);

        //           newConnection = new Connection(city, otherCity);
        //           shouldAdd = connections.reduce((res, item) =>
        //                 res && ! item.isEqual(newConnection), true);
        //           if (shouldAdd) {
        //             connections.push(
        //               newConnection
        //             );
        //             city.addConnection(newConnection);
        //             otherCity.addConnection(newConnection);
        //           }
        //         }
        //       }
        //     }
        //   })

        //   let newCity = new City(mouseX, mouseY);
        //   if (checkNoOverlap(newCity)) {
        //     cities.push(newCity);
        //   }
        // }
    }

    handleDeletePress() {
        console.log("Handling delete press!");
        // if (selectedCities.length == 1) {
        //   selectedCity = selectedCities[0];
        //   selectedConnections = selectedCity.getConnections();
        //   selectedConnections.map(
        //     connection => {
        //       connection.deleteConnection();
        //     }
        //   );

        //   connections = deleteMultipleObjectsFromArray(
        //     connections, selectedConnections
        //   );

        //   cities = cities.filter(
        //     city => city != selectedCity
        //   );
        //   selectedCities = [];
        // }
            }

    handlePlayButtonClick() {
        console.log("Handling play button click");

        // playing = !playing;
        // if (playing) {
        //   playButton.html("PAUSE");
        // } else {
        //   playButton.html("PLAY")
        // }
    }
}