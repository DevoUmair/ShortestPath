let cities = []; // Store city coordinates
        let allRoutes = []; // Store all possible routes
        let currentRouteIndex = 0; // Track which route is being displayed
        let routeInterval; // Store the interval ID
        
        const svg = d3.select("#tsp-canvas"); // Select the SVG element
        const resetBtn = document.getElementById("reset-btn"); // Reset button
        const solveBtn = document.getElementById("solve-btn"); // Solve button
        const shortesteBtn = document.getElementById("shortest-btn"); // Solve button
        
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
            .attr("fill", "black");
        }
        
        // Draw a single route with a random color
        function drawRoute(route, isShortest) {
          let color;
          if (isShortest) {
              color = '#FF0000';
          } else {
              color = getRandomColor(); // Generate a random color
          }
      
          // Remove existing arrowheads before drawing new ones
          svg.selectAll(".arrowhead").remove();
      
          // Calculate the total time to complete the entire route animation
          const totalTime = (route.length - 1) * 1000 + 1000;
      
          for (let i = 0; i < route.length - 1; i++) {
              const from = route[i];
              const to = route[i + 1];
      
              // Calculate distance between points for the animation length
              const distance = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
      
              // Draw the line with dash properties for animation
              svg.append("line")
                  .attr("x1", from.x)
                  .attr("y1", from.y)
                  .attr("x2", to.x)
                  .attr("y2", to.y)
                  .attr("stroke", color)
                  .attr("stroke-width", 2)
                  .attr("stroke-dasharray", distance) // Set dash array to match length
                  .attr("stroke-dashoffset", distance) // Set initial offset to hide line
                  .transition() // Add transition for drawing effect
                  .delay(i * 1000) // Delay for each segment
                  .duration(1000) // Duration of animation in ms
                  .attr("stroke-dashoffset", 0); // Set offset to 0 to draw the line
      
              // Calculate the midpoint for the arrowhead
              const midPoint = {
                  x: (from.x + to.x) / 2,
                  y: (from.y + to.y) / 2
              };
      
              // Draw arrowhead at the midpoint after the line animation completes
              setTimeout(() => drawArrowhead(midPoint, from, to, color), i * 1000 + 1000);
          }
      
          // Enable buttons after the entire route animation completes
          if(isShortest){
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

          // Draw the arrowhead and assign a class for easy selection
          svg.append("polygon")
            .attr("points", `${midPoint.x},${midPoint.y} ${x1},${y1} ${x2},${y2}`)
            .attr("fill", color)     // Ensure fill color is set first
            .attr("class", "arrowhead"); // Add a class to identify arrowheads
        }
        
        
        
        
        // Generate a random color for each route
        function getRandomColor() {
          return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        }
        
        // Generate all permutations of cities (excluding City 0)
        function permute(arr, l, r) {
          console.log("Staring New Function");
          console.log("l :", l, "r :", r);
          if (l === r) {
              const route = [cities[0], ...arr, cities[0]]; // Start and end at City 0
              allRoutes.push(route); // Store the route
              console.log(allRoutes);
          } else {
              for (let i = l; i <= r; i++) {
                  console.log("i :", i, "l :", l);
                  console.log("before Swap:", JSON.stringify(arr)); // Log before swap
                  [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap
                  console.log("After Swap:", JSON.stringify(arr)); // Log after swap
                  permute(arr, l + 1, r); // Recurse
                  [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap back
              }
          }
      }
      
        
        // Display all routes one by one with a delay
        function displayRoutesSequentially() {
          if (currentRouteIndex >= allRoutes.length) {
            clearInterval(routeInterval); // Stop when all routes have been displayed
            enableButtons()
            return;
          }
        
          svg.selectAll("line").remove(); // Clear the previous route lines
          drawRoute(allRoutes[currentRouteIndex] , false); // Draw the current route
          currentRouteIndex++; // Move to the next route
        }
        
        // Solve TSP and start displaying routes sequentially
        solveBtn.addEventListener("click", () => {
          if (cities.length < 2) {
            alert("Add at least two cities to solve the problem.");
            return;
          }
        
          disableButtons()
          allRoutes = []; // Clear previous routes
          currentRouteIndex = 0; // Reset the route index
        
          const otherCities = cities.slice(1); // Exclude City 0
          console.log(otherCities);
          permute(otherCities, 0, otherCities.length - 1); // Generate permutations
        
          // Clear previous routes immediately before starting the interval and redraw all cities
          svg.selectAll("*").remove(); // Clear previous drawings
          cities.forEach(drawCity); 

          const totTime = cities.length * 1000
        
          routeInterval = setInterval(displayRoutesSequentially, totTime + 400); // Display each route every 2 seconds
        });
        
        // Reset the canvas and clear data
        resetBtn.addEventListener("click", () => {
          cities = [];
          allRoutes = [];
          currentRouteIndex = 0;
          clearInterval(routeInterval); // Stop the route display
          svg.selectAll("*").remove(); // Clear the SVG canvas
        });

        function calculateDistance(cityA, cityB) {
          const dx = cityA.x - cityB.x;
          const dy = cityA.y - cityB.y;
          return Math.sqrt(dx * dx + dy * dy); // Euclidean distance
        }

//Calculate the distance of route
function calculateTotalDistance(route) {
  let totalDistance = 0;

  for (let i = 0; i < route.length - 1; i++) {
      totalDistance += calculateDistance(route[i], route[i + 1]);
  }
  
  totalDistance += calculateDistance(route[route.length - 1], route[0]);
  
  return totalDistance;
} 

// Solve TSP and start displaying routes sequentially
solveBtn.addEventListener("click", () => {
  allRoutedata = []
  document.querySelector("#routesTable tbody").innerHTML = ''; 
  toggleTableVisibility()

  if (cities.length < 2) {
    alert("Add at least two cities to solve the problem.");
    return;
  }

  disableButtons()
  allRoutes = [];
  currentRouteIndex = 0; 

  const otherCities = cities.slice(1); 
  console.log(otherCities);
  permute(otherCities, 0, otherCities.length - 1); 

  svg.selectAll("*").remove(); 
  cities.forEach(drawCity); 

  const totTime = cities.length * 700

  routeInterval = setInterval(displayRoutesSequentially, totTime + 700); 
});

function findGreedyRoute() {
  disableButtons()
  const visited = new Array(cities.length).fill(false); 
  const route = [cities[0]]; 
  visited[0] = true; 

  let currentCity = cities[0];

  for (let i = 1; i < cities.length; i++) {
    let nearestCity = null;
    let shortestDistance = Infinity;

    for (let j = 0; j < cities.length; j++) {
      if (!visited[j]) {
        const distance = calculateDistance(currentCity, cities[j]);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestCity = cities[j];
        }
      }
    }

    visited[cities.indexOf(nearestCity)] = true; 
    route.push(nearestCity);
    currentCity = nearestCity; 
  }

  route.push(cities[0]);
  console.log(route);

  svg.selectAll("*").remove(); 
  cities.forEach(drawCity); 

  drawRoute(route , true);
}


resetBtn.addEventListener("click", () => {
  allRoutedata = []
  document.querySelector("#routesTable tbody").innerHTML = ''; 
  toggleTableVisibility()
  distnceCon.classList.add('none')
  distnceCon.classList.remove('show')
  cities = [];
  allRoutes = [];
  currentRouteIndex = 0;
  clearInterval(routeInterval); 
  svg.selectAll("*").remove(); 
});


function enableButtons() {
  console.log("button enabled");
  resetBtn.disabled = false;
  solveBtn.disabled = false;
  // shortesteBtn.disabled = false;

  resetBtn.classList.remove('disabled')
  solveBtn.classList.remove('disabled')
  // shortesteBtn.classList.remove('disabled')

}

function disableButtons() {
    console.log("button disabled");
    resetBtn.disabled = true;
    solveBtn.disabled = true;
    // shortesteBtn.disabled = true;

    
  resetBtn.classList.add('disabled')
  solveBtn.classList.add('disabled')
  // shortesteBtn.classList.add('disabled')
}

     // shortesteBtn.addEventListener("click" , () => {
//   findGreedyRoute()
// })