let frameWidth = 1000;
let frameHeight = 600;

let maxPheromones = 20;

let playButton;
let eventHandler = new EventHandler();

function setup() {
  City.setColor(color(39, 201, 120));
  City.setStrokeColor(color(225, 59, 44));
  City.setDoubleClickStrokeColor(color(255, 250, 104));
  City.setStrokeWeight(4);
  City.setRadius(10);
  City.setLargeRadius(13);

  Connection.setColor(color(28, 186, 176));
  Connection.setStrokeWeight(3);

  createCanvas(frameWidth, frameHeight);
  angleMode(DEGREES);

    // input = createFileInput(handleFile);
    // input.position(10, 500);
    //
    // repeat = createCheckbox("Repeat", false);
    // repeat.position(100, 550);
    // repeat.changed(handleCheckboxChange);

  playButton = createButton("PLAY");
  playButton.position(1100, 200);
  playButton.mousePressed(handlePlayButtonPress);
}

function draw() {
  background(220);
  eventHandler.update(mouseX, mouseY);
}

function mouseClicked() {
  eventHandler.handleMouseClick(mouseX, mouseY);
}

function keyPressed() {
  if (keyCode == DELETE) {
    handleDeletePress();
  }
}

function handleDeletePress() {
  eventHandler.handleDeletePress();
}

function handlePlayButtonPress() {
  eventHandler.handlePlayButtonClick()
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
  connections.map(connection => connection.drawConnection(
    maxPheromones
  ));
}

function drawCities() {
  cities.map(city => city.drawCity());
}

function withinFrame(xPosition, yPosition) {
  return (xPosition >= 0 && xPosition <= frameWidth
          && yPosition >= 0 && yPosition <= frameHeight);
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
