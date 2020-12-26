class EventHandler {
    constructor(width, height) {
        this.frameWidth = width;
        this.frameHeight = height;
        this.playing = false;
        this.environment = new Environment();
    }

    update(mousePositionX, mousePositionY) {
        const doubleSelection = this.environment.getDoubleSelectedCities();
        if (doubleSelection.length == 1) {
            doubleSelection[0].updatePosition(mousePositionX, mousePositionY);
        }
        this.environment.getNormalCities().filter(
            city => city.withinArea(mousePositionX, mousePositionY)
        ).map(city => city.setToHoverState());
        this.environment.getHoveredCities().filter(
            city => ! city.withinArea(mousePositionX, mousePositionY)
        ).map(city => city.setToNormalState());
        this.environment.draw();
    }

    handleMouseClick(mousePositionX, mousePositionY) {
        if (withinFrame(mousePositionX, mousePositionY)) {
            const blockingCities = this.environment.getCities().filter(city =>
                city.withinArea(mousePositionX, mousePositionY, City.largeRadius)
            );
            if (blockingCities.length == 0) {
                this.environment.addCity(mousePositionX, mousePositionY);
                this.undoSelections();
            } else {
                const selectedCities = blockingCities.filter(
                    city => city.withinArea(mousePositionX, mousePositionY)
                );
                if (selectedCities.length > 1) {
                    throw "More than 1 city selected?!?";
                }
                if (selectedCities.length == 1) {
                    selectedCities[0].click();
                    this.connectCities();
                }
            }
        }
    }

    handleDeletePress() {
        const selectedCities = this.environment.getSelectedCities();

        if (selectedCities.length > 0) {
            selectedCities.map(city => {
                const connections = city.getConnections();
                connections.map(connection => {
                    this.environment.removeConnection(connection);
                    connection.deleteConnection();
                });
                this.environment.deleteCity(city)
            });
        }
    }

    handlePlayButtonClick() {
        this.playing = !this.playing;

        if (this.playing) {
            playButton.html("PAUSE");
        } else {
            playButton.html("PLAY");
        }
    }

    withinFrame(positionX, positionY) {
        return (positionX >= 0 && positionY <= this.frameWidth
                && positionY >= 0 && postionY <= this.frameHeight)
    }

    undoSelections() {
        this.environment.getSelectedCities().map(
            city => city.setToNormalState()
        );
        this.environment.getDoubleSelectedCities().map(
            city => city.setToNormalState()
        );
    }

    connectCities() {
        const selectedCities = this.environment.getSelectedCities();
        if (selectedCities.length > 2) {
            throw "More than two cities selected!";
        }

        if (selectedCities.length == 2) {
            if (! selectedCities[0].isConnectedTo(selectedCities[1])) {
                this.environment.addConnection(
                    selectedCities[0], selectedCities[1]
                );    
            }

            selectedCities.map(city => city.setToNormalState());
        }
    }
}