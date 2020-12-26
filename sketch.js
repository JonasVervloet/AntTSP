let cities;
let selectedCities;
let doubleConnectedCities;
let connections;

let playButton;
let algorithmUpdateSpeed = 50;
let counter = 0
let playing = false;

let frameWidth = 1000;
let frameHeight = 600;

let maxPheromones = 20;

function setup() {
  City.setColor(
    color(39, 201, 120)
  );
  City.setStrokeColor(
    color(225, 59, 44)
  );
  City.setDoubleClickStrokeColor(
    color(255, 250, 104)
  );
  City.setStrokeWeight(4);
  City.setRadius(10);
  City.setLargeRadius(13);

  Connection.setColor(
    color(28, 186, 176)
  );
  Connection.setStrokeWeight(3);

  cities = [];
  selectedCities = [];
  doubleSelectedCities = [];
  connections = [];

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

  const city1 = new City(20, 40);
  const city2 = new City(100, 120);
  const city3 = new City(500, 300);
  cities.push(city1);
  cities.push(city2);

  city1.click();
  city1.setToHoverState();
  console.log(city1.isHovered());
  city1.updatePosition(200, 400);

  const connection = new Connection(cities[0], cities[1]);
  connections.push(connection);
  console.log(cities);
  console.log(connections);

  console.log(connection.getOtherCity(city1));
  console.log(connection.getOtherCity(city2));
  console.log(connection.getOtherCity(city3));
}

function draw() {
  background(220);

  // updateCities();

  drawConnections();
  drawCities();

  // if (playing) {
  //   if (counter == 0) {
  //     console.log("update algorithm!");
  //     // run ACO optimisation
  //   }
  //   counter += 1;
  //   counter = counter % algorithmUpdateSpeed;
  // }
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

// function mouseClicked() {
//   if (withinFrame(mouseX, mouseY)) {
//     cities.map(city => {
//       if (city.withinArea(mouseX, mouseY)) {
//         if (doubleSelectedCities.length == 1 &&
//               doubleSelectedCities[0] == city) {
//           city.changeDoubleClicked(false);
//           doubleSelectedCities = [];
//         } else if (selectedCities.length == 0) {
//           selectedCities.push(city);
//           city.changeClicked(true);
//         } else if (selectedCities.length == 1) {
//           if (selectedCities[0] == city) {
//             doubleSelectedCities.push(city);
//             selectedCities = [];
//             city.changeDoubleClicked(true);
//           } else {
//             otherCity = selectedCities[0];
//             selectedCities = [];

//             otherCity.changeClicked(false);
//             city.changeClicked(false);

//             newConnection = new Connection(city, otherCity);
//             shouldAdd = connections.reduce((res, item) =>
//                   res && ! item.isEqual(newConnection), true);
//             if (shouldAdd) {
//               connections.push(
//                 newConnection
//               );
//               city.addConnection(newConnection);
//               otherCity.addConnection(newConnection);
//             }
//           }
//         }
//       }
//     })

//     let newCity = new City(mouseX, mouseY);
//     if (checkNoOverlap(newCity)) {
//       cities.push(newCity);
//     }
//   }
// }

function withinFrame(xPosition, yPosition) {
  return (xPosition >= 0 && xPosition <= frameWidth
          && yPosition >= 0 && yPosition <= frameHeight);
}

// function keyPressed() {
//   if (keyCode == DELETE) {
//     handleDeletePress();
//   }
// }

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

function handlePlayButtonPress() {
  playing = !playing;
  if (playing) {
    playButton.html("PAUSE");
  } else {
    playButton.html("PLAY")
  }
}
