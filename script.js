let cities = []; // Store city coordinates
let allRoutes = []; // Store all possible routes
let currentRouteIndex = 0; // Track which route is being displayed
let routeInterval; // Store the interval ID

const svg = d3.select("#tsp-canvas"); // Select the SVG element
const resetBtn = document.getElementById("reset-btn"); // Reset button
const solveBtn = document.getElementById("solve-btn"); // Solve button
const shortestBtn = document.getElementById("shortest-btn"); // Shortest route button

// Add a new city when the SVG canvas is clicked
svg.on("click", function (event) {
  const [x, y] = d3.pointer(event, this);
  const newCity = { id: cities.length, x, y };
  cities.push(newCity);
  drawCity(newCity);
  console.log(cities);
});

// Draw a city (circle and label)
function drawCity(city) {
  svg.append("circle")
    .attr("cx", city.x)
    .attr("cy", city.y)
    .attr("r", 10)
    .attr("fill", "blue");

  svg.append("text")
    .attr("x", city.x + 15)
    .attr("y", city.y + 5)
    .text(`City ${city.id}`)
    .attr("font-size", "12px")
    .attr("fill", "white");
}

// Draw a single route with a random color
function drawRoute(route, isShortest) {
  let color = isShortest ? '#FF0000' : getRandomColor(); // Red for shortest, random for others

  svg.selectAll(".arrowhead").remove(); // Remove existing arrowheads before drawing new ones

  const totalTime = (route.length - 1) * 1000 + 1000;

  for (let i = 0; i < route.length - 1; i++) {
    const from = route[i];
    const to = route[i + 1];
    const distance = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));

    svg.append("line")
      .attr("x1", from.x)
      .attr("y1", from.y)
      .attr("x2", to.x)
      .attr("y2", to.y)
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", distance)
      .attr("stroke-dashoffset", distance)
      .transition()
      .delay(i * 1000)
      .duration(1000)
      .attr("stroke-dashoffset", 0);

    const midPoint = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2
    };

    setTimeout(() => drawArrowhead(midPoint, from, to, color), i * 1000 + 1000);
  }

  if (isShortest) {
    setTimeout(() => {
      enableButtons();
    }, totalTime);
  }
}

// Function to draw an arrowhead at the midpoint of a line
function drawArrowhead(midPoint, from, to, color) {
  const arrowLength = 10; // Length of the arrowhead
  const arrowWidth = 5;   // Width of the arrowhead

  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const x1 = midPoint.x - arrowLength * Math.cos(angle - Math.PI / 6);
  const y1 = midPoint.y - arrowLength * Math.sin(angle - Math.PI / 6);
  const x2 = midPoint.x - arrowLength * Math.cos(angle + Math.PI / 6);
  const y2 = midPoint.y - arrowLength * Math.sin(angle + Math.PI / 6);

  svg.append("polygon")
    .attr("points", `${midPoint.x},${midPoint.y} ${x1},${y1} ${x2},${y2}`)
    .attr("fill", color)
    .attr("class", "arrowhead");
}

// Generate a random color for each route
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Generate all permutations of cities (excluding City 0)
function permute(arr, l, r) {
  if (l === r) {
    const route = [cities[0], ...arr, cities[0]]; // Start and end at City 0
    allRoutes.push(route); // Store the route
  } else {
    for (let i = l; i <= r; i++) {
      [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap
      permute(arr, l + 1, r); // Recurse
      [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap back
    }
  }
}

// Display all routes one by one with a delay
function displayRoutesSequentially() {
  if (currentRouteIndex >= allRoutes.length) {
    clearInterval(routeInterval); // Stop when all routes have been displayed
    enableButtons();
    return;
  }

  svg.selectAll("line").remove(); // Clear the previous route lines
  drawRoute(allRoutes[currentRouteIndex], false); // Draw the current route
  currentRouteIndex++; // Move to the next route
}

// Solve TSP and start displaying routes sequentially
solveBtn.addEventListener("click", () => {
  if (cities.length < 2) {
    alert("Add at least two cities to solve the problem.");
    return;
  }

  disableButtons();
  allRoutes = []; // Clear previous routes
  currentRouteIndex = 0; // Reset the route index

  const otherCities = cities.slice(1); // Exclude City 0
  permute(otherCities, 0, otherCities.length - 1); // Generate permutations

  svg.selectAll("*").remove(); // Clear previous drawings
  cities.forEach(drawCity);

  const totTime = cities.length * 1000;

  routeInterval = setInterval(displayRoutesSequentially, totTime + 400); // Display each route every few seconds
});

// Reset the canvas and clear data
resetBtn.addEventListener("click", () => {
  cities = [];
  allRoutes = [];
  currentRouteIndex = 0;
  clearInterval(routeInterval); // Stop the route display
  svg.selectAll("*").remove(); // Clear the SVG canvas
});

// Calculate distance between two cities
function calculateDistance(cityA, cityB) {
  const dx = cityA.x - cityB.x;
  const dy = cityA.y - cityB.y;
  return Math.sqrt(dx * dx + dy * dy); // Euclidean distance
}

// Calculate total distance for a given route
function calculateTotalDistance(route) {
  let totalDistance = 0;

  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += calculateDistance(route[i], route[i + 1]);
  }

  // Add distance back to the starting city
  totalDistance += calculateDistance(route[route.length - 1], route[0]);

  return totalDistance;
}

// Find the shortest route using brute-force
function findShortestRoute() {
  disableButtons();
  
  let shortestRoute = null;
  let minDistance = Infinity;

  allRoutes.forEach(route => {
    const distance = calculateTotalDistance(route);
    if (distance < minDistance) {
      minDistance = distance;
      shortestRoute = route;
    }
  });

  console.log("Shortest Route:", shortestRoute);
  svg.selectAll("*").remove(); // Clear previous drawings
  cities.forEach(drawCity);
  
  drawRoute(shortestRoute, true); // Draw the shortest route
}

shortestBtn.addEventListener("click", () => {
  if (cities.length < 2) {
    alert("Add at least two cities to find the shortest route.");
    return;
  }
  findShortestRoute();
});

// Enable buttons after the route display completes
function enableButtons() {
  resetBtn.disabled = false;
  solveBtn.disabled = false;
  shortestBtn.disabled = false;

  resetBtn.classList.remove('disabled');
  solveBtn.classList.remove('disabled');
  shortestBtn.classList.remove('disabled');
}

// Function to disable all buttons
function disableButtons() {
  resetBtn.disabled = true;
  solveBtn.disabled = true;
  shortestBtn.disabled = true;

  resetBtn.classList.add('disabled');
  solveBtn.classList.add('disabled');
  shortestBtn.classList.add('disabled');
}
