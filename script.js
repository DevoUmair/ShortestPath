

        let cities = []; // Store city coordinates
        let allRoutes = []; // Store all possible routes
        let currentRouteIndex = 0; // Track which route is being displayed
        let routeInterval; // Store the interval ID
        let shortestRoute = null; // Store the shortest route
        let minDistance = Infinity; // Track the minimum distance
        
        const svg = d3.select("#tsp-canvas") // Select the SVG element
          .style("background-color", "black"); // Set canvas background color to black
        const resetBtn = document.getElementById("reset-btn"); // Reset button
        const solveBtn = document.getElementById("solve-btn"); // Solve button
        
        // Add a new city when the SVG canvas is clicked
        svg.on("click", function (event) {
          const [x, y] = d3.pointer(event, this);
          const newCity = { id: cities.length, x, y };
          cities.push(newCity);
          drawCity(newCity);
        });
        
        // Draw a city (circle and label)
        function drawCity(city) {
          svg.append("circle")
            .attr("cx", city.x)
            .attr("cy", city.y)
            .attr("r", 10)
            .attr("fill", "lightblue");
        
          svg.append("text")
            .attr("x", city.x + 15)
            .attr("y", city.y + 5)
            .text(`City ${city.id}`)
            .attr("font-size", "12px")
            .attr("fill", "white"); // Change text color to white for visibility
        }

          

        function drawArrow(from, to, isShortest) {
            // Calculate the midpoint
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
          
            const arrowLength = 8; // Length of the arrowhead
            const angle = Math.atan2(to.y - from.y, to.x - from.x); // Calculate the angle of the line
          
            // Calculate the arrowhead points based on midpoint
            const x1 = midX - arrowLength * Math.cos(angle - Math.PI / 6); // Left point
            const y1 = midY - arrowLength * Math.sin(angle - Math.PI / 6); // Left point
            const x2 = midX - arrowLength * Math.cos(angle + Math.PI / 6); // Right point
            const y2 = midY - arrowLength * Math.sin(angle + Math.PI / 6); // Right point
          
            // Draw the arrowhead
            svg.append("polygon")
              .attr("points", `${midX},${midY} ${x1},${y1} ${x2},${y2}`)
              .attr("fill", isShortest ? "red" : "white") // Color based on whether it's the shortest route
              .attr("class", "arrow"); // Add class for easier removal
          }
          
          function drawRoute(route, isShortest = false) {
            const color = isShortest ? "red" : "white"; // Set color based on shortest route
          
            for (let i = 0; i < route.length - 1; i++) {
              const from = route[i];
              const to = route[i + 1];
          
              svg.append("line")
                .attr("x1", from.x)
                .attr("y1", from.y)
                .attr("x2", to.x)
                .attr("y2", to.y)
                .attr("stroke", color)
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", isShortest ? "0" : "5, 5")
                .attr("class", isShortest ? "shortest-route" : "route"); // Add class for easier removal
          
              // Draw arrow for the current segment
              drawArrow(from, to, isShortest);
            }
          
            // Connect the last city back to the first city
            const last = route[route.length - 1];
            const first = route[0];
          
            svg.append("line")
              .attr("x1", last.x)
              .attr("y1", last.y)
              .attr("x2", first.x)
              .attr("y2", first.y)
              .attr("stroke", color)
              .attr("stroke-width", 2)
              .attr("stroke-dasharray", isShortest ? "0" : "5, 5")
              .attr("class", isShortest ? "shortest-route" : "route"); // Add class for easier removal
          
            // Draw arrow for the last segment
            drawArrow(last, first, isShortest);
          }
          
  
        //BRUTE FORCE ALGORITHM STARTING
        // Calculate the total distance of a given route
        function calculateDistance(route) {
          let distance = 0;
          for (let i = 0; i < route.length - 1; i++) {
            const dx = route[i + 1].x - route[i].x;
            const dy = route[i + 1].y - route[i].y;
            distance += Math.sqrt(dx * dx + dy * dy);
          }
          return distance;
        }
        
        // Generate all permutations of cities (excluding City 0)
        function permute(arr, l, r) {
          if (l === r) {
            const route = [cities[0], ...arr, cities[0]]; // Start and end at City 0
            allRoutes.push(route); // Store the route
        
            const distance = calculateDistance(route); // Calculate distance of this route
            if (distance < minDistance) {
              minDistance = distance;
              shortestRoute = route; // Update shortest route
            }
          } else {
            for (let i = l; i <= r; i++) {
              [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap
              permute(arr, l + 1, r); // Recurse
              [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap back
            }
          }
        }

          //BRUTE FORCE ALGORITHM ENDING
        
      // Display routes one at a time
function displayRoutesSequentially() {
    if (allRoutes.length === 0) return; // No routes to display

    svg.selectAll(".route").remove(); // Clear previous route drawings
    svg.selectAll(".arrow")
  .filter(function () {
    return d3.select(this).attr("fill") !== "red"; // Check if the arrow is not red
  })
  .remove();

    // Redraw cities each time to ensure they remain visible
    cities.forEach(drawCity); // Redraw all cities

    const currentRoute = allRoutes[currentRouteIndex];
    drawRoute(currentRoute, currentRoute === shortestRoute); // Draw the current route

    currentRouteIndex = (currentRouteIndex + 1) % allRoutes.length; // Loop back to start
}

        
        // Solve TSP and start the infinite loop
        solveBtn.addEventListener("click", () => {
          if (cities.length < 2) {
            alert("Add at least two cities to solve the problem.");
            return;
          }
        
          allRoutes = [];
          currentRouteIndex = 0;
          shortestRoute = null;
          minDistance = Infinity;
        
          const otherCities = cities.slice(1); // Exclude City 0
          permute(otherCities, 0, otherCities.length - 1); // Generate permutations
        
          svg.selectAll("*").remove(); // Clear previous drawings
          cities.forEach(drawCity); // Redraw all cities
        
          // Start infinite loop to display routes every 2 seconds
          routeInterval = setInterval(displayRoutesSequentially, 2000);
        });
        
        // Reset everything
        resetBtn.addEventListener("click", () => {
          cities = [];
          allRoutes = [];
          currentRouteIndex = 0;
          shortestRoute = null;
          minDistance = Infinity;
          clearInterval(routeInterval); // Stop route display
          svg.selectAll("*").remove(); // Clear the canvas
        });
        


