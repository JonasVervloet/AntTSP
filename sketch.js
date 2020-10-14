let cities;
let selectedCities;
let doubleConnectedCities;
let connections;

function setup() {
  cities = [];
  selectedCities = [];
  doubleSelectedCities = [];
  connections = [];

  createCanvas(1000, 600);
  angleMode(DEGREES);

    // input = createFileInput(handleFile);
    // input.position(10, 500);
    //
    // repeat = createCheckbox("Repeat", false);
    // repeat.position(100, 550);
    // repeat.changed(handleCheckboxChange);
    //
    // playButton = createButton("PLAY");
    // playButton.position(10, 550);
    // playButton.mousePressed(handlePlayButtonPress);
}

function draw() {
  background(220);

  updateCities();

  drawConnections();
  drawCities();
}

function updateCities() {
  if (doubleSelectedCities.length != 0) {
    selectedCity = doubleSelectedCities[0];
    selectedCity.changePosition(mouseX, mouseY);
  } else {
    cities.map(city => {
      if (city.withinArea(mouseX, mouseY)) {
        city.changeHover(true);
      } else {
        city.changeHover(false);
      }
    });
  }
}

function drawConnections() {
  connections.map(connection => connection.drawConnection());
}

function drawCities() {
  cities.map(city => city.drawCity());
}

function mouseClicked() {
  cities.map(city => {
    if (city.withinArea(mouseX, mouseY)) {
      if (doubleSelectedCities.length == 1 &&
            doubleSelectedCities[0] == city) {
        city.changeDoubleClicked(false);
        doubleSelectedCities = [];
      } else if (selectedCities.length == 0) {
        selectedCities.push(city);
        city.changeClicked(true);
      } else if (selectedCities.length == 1) {
        if (selectedCities[0] == city) {
          doubleSelectedCities.push(city);
          selectedCities = [];
          city.changeDoubleClicked(true);
        } else {
          otherCity = selectedCities[0];
          selectedCities = [];

          otherCity.changeClicked(false);
          city.changeClicked(false);

          newConnection = new Connection(city, otherCity);
          shouldAdd = connections.reduce((res, item) =>
                res && ! item.isEqual(newConnection), true);
          if (shouldAdd) {
            connections.push(
              newConnection
            );
            city.addConnection(newConnection);
            otherCity.addConnection(newConnection);
          }
        }
      }
    }
  })

  let newCity = new City(mouseX, mouseY);
  if (checkNoOverlap(newCity)) {
    cities.push(newCity);
  }
}

function keyPressed() {
  if (keyCode == DELETE) {
    handleDeletePress();
  }
}

function handleDeletePress() {
  if (selectedCities.length == 1) {
    selectedCity = selectedCities[0];
    selectedConnections = selectedCity.getConnections();
    selectedConnections.map(
      connection => {
        connection.deleteConnection();
      }
    );

    connections = deleteMultipleObjectsFromArray(
      connections, selectedConnections
    );

    cities = cities.filter(
      city => city != selectedCity
    );
    selectedCities = [];
  }
}

function checkNoOverlap(city) {
  for(let i = 0; i < cities.length; i++) {
    if (city.overlap(cities[i])) {
      return false;
    }
  }
  return true;
}

function deleteMultipleObjectsFromArray(array, objectsToDelete) {
  objectsToDelete.forEach((objectToDelete, i) => {
    array = deleteObjectFromArray(array, objectToDelete);
  });

  return array;
}

function deleteObjectFromArray(array, objectToDelete) {
  return array.filter(
    object => object != objectToDelete
  );
}
