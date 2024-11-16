
// // Array to store city coordinates and labels
// let cities = [];

// // D3.js setup to use the existing SVG element
// const svg = d3.select("#city-map svg") // Targeting the pre-existing SVG
//   .on("click", function (event) {
//     const [x, y] = d3.pointer(event);
//     addCity(x, y);
// });

// // Add city to the map
// function addCity(x, y) {
//   const cityIndex = cities.length;
//   cities.push({ x, y, label: `City ${cityIndex}` });

//   // Draw the city as a circle
//   svg.append("circle")
//     .attr("class", "city")
//     .attr("cx", x)
//     .attr("cy", y)
//     .attr("r", 5)
//     .attr("fill", "red");

//   // Add a label to the city
//   svg.append("text")
//     .attr("class", "city-label")
//     .attr("x", x + 10)
//     .attr("y", y - 10)
//     .attr("font-size", 12)
//     .attr("fill", "black")
//     .text(`City ${cityIndex}`);
// }

// // Calculate distances between cities
// function calculateDistanceMatrix() {
//   const distanceMatrix = [];
//   for (let i = 0; i < cities.length; i++) {
//     distanceMatrix[i] = [];
//     for (let j = 0; j < cities.length; j++) {
//       if (i === j) {
//         distanceMatrix[i][j] = 0;
//       } else {
//         const dx = cities[i].x - cities[j].x;
//         const dy = cities[i].y - cities[j].y;
//         distanceMatrix[i][j] = Math.sqrt(dx * dx + dy * dy);
//       }
//     }
//   }
//   return distanceMatrix;
// }

// // TSP Class with Dynamic Programming
// class TravellingSalesmanProblem {
//   constructor(distanceMatrix, startCity) {
//     this.distanceMatrix = distanceMatrix;
//     this.n = distanceMatrix.length;
//     this.startCity = startCity;
//     this.memo = Array.from({ length: this.n }, () => Array(1 << this.n).fill(null));
//     this.shortestPath = [];
//     this.minPathCost = Infinity;
//   }

//   tsp(city, visited) {
//     if (visited === (1 << this.n) - 1) {
//       return this.distanceMatrix[city][this.startCity];
//     }

//     if (this.memo[city][visited] !== null) {
//       return this.memo[city][visited];
//     }

//     let minCost = Infinity;
//     for (let nextCity = 0; nextCity < this.n; nextCity++) {
//       if (!(visited & (1 << nextCity))) {
//         const newVisited = visited | (1 << nextCity);
//         const tourCost = this.distanceMatrix[city][nextCity] + this.tsp(nextCity, newVisited);
//         minCost = Math.min(minCost, tourCost);
//       }
//     }

//     this.memo[city][visited] = minCost;
//     return minCost;
//   }

//   findPath(city, visited) {
//     this.shortestPath.push(city);
//     if (visited === (1 << this.n) - 1) return;

//     let minCost = Infinity;
//     let nextCity = -1;
//     for (let i = 0; i < this.n; i++) {
//       if (!(visited & (1 << i))) {
//         const newVisited = visited | (1 << i);
//         const cost = this.distanceMatrix[city][i] + this.memo[i][newVisited];
//         if (cost < minCost) {
//           minCost = cost;
//           nextCity = i;
//         }
//       }
//     }

//     if (nextCity !== -1) {
//       this.findPath(nextCity, visited | (1 << nextCity));
//     }
//   }

//   solve() {
//     this.minPathCost = this.tsp(this.startCity, 1 << this.startCity);
//     this.shortestPath = [];
//     this.findPath(this.startCity, 1 << this.startCity);
//     this.shortestPath.push(this.startCity);
//   }
// }

// // Solve TSP and display
// function solveTSP() {

//   if (cities.length < 2) {
//     alert("Please place at least two cities on the map.");
//     return;
//   }

//   const distanceMatrix = calculateDistanceMatrix();
//   const startCity = 0;
//   const tour = new TravellingSalesmanProblem(distanceMatrix, startCity);
//   tour.solve();

//   displayPath(tour.shortestPath);
//   document.getElementById("shortest-path").textContent = tour.shortestPath.join(" → ");
//   document.getElementById("min-path-cost").textContent = tour.minPathCost.toFixed(2);
// }

// // Display shortest path with arrows at the midpoint
// function displayPath(path) {
//   svg.selectAll(".path-line").remove();
//   svg.selectAll(".arrow-head").remove();

//   for (let i = 0; i < path.length - 1; i++) {
//     const startCity = cities[path[i]];
//     const endCity = cities[path[i + 1]];

//     // Draw the path line
//     svg.append("line")
//       .attr("class", "path-line")
//       .attr("x1", startCity.x)
//       .attr("y1", startCity.y)
//       .attr("x2", endCity.x)
//       .attr("y2", endCity.y)
//       .attr("stroke", "blue")
//       .attr("stroke-width", 2);

//     // Calculate midpoint for the arrow
//     const midX = (startCity.x + endCity.x) / 2;
//     const midY = (startCity.y + endCity.y) / 2;

//     // Add an arrow at the midpoint
//     svg.append("path")
//       .attr("class", "arrow-head")
//       .attr("d", "M-5,-5 L5,0 L-5,5 Z")
//       .attr("fill", "blue")
//       .attr("transform", `translate(${midX},${midY}) rotate(${Math.atan2(endCity.y - startCity.y, endCity.x - startCity.x) * 180 / Math.PI})`);
//   }
// }

// // Attach the solve button event listener after DOM is loaded
// document.addEventListener("DOMContentLoaded", function() {
//   const solveButton = document.getElementById("solve-btn");
//   if (solveButton) {
//     solveButton.addEventListener("click", solveTSP);
//     console.log('Solve button connected successfully');
//   } else {
//     console.log('Error: Could not find solve button');
//   }

//   // Optional: Add a clear/reset button
//   const clearButton = document.getElementById("clear-btn");
//   if (clearButton) {
//     clearButton.addEventListener("click", function() {
//       // Clear the cities array
//       cities = [];
//       // Remove all circles, labels, and paths
//       svg.selectAll('.city').remove();
//       svg.selectAll('.city-label').remove();
//       svg.selectAll('.path-line').remove();
//       svg.selectAll('.arrow-head').remove();
//       // Clear the results
//       document.getElementById('shortest-path').textContent = '';
//       document.getElementById('min-path-cost').textContent = '';
//     });
//   }
// });









//working final

 // Array to store city coordinates and labels
let cities = [];

// D3.js setup to use the existing SVG element
const svg = d3.select("#city-map svg") // Targeting the pre-existing SVG
  .on("click", function (event) {
    const [x, y] = d3.pointer(event);
    addCity(x, y);
});

// Add city to the map
function addCity(x, y) {
  const cityIndex = cities.length;
  cities.push({ x, y, label: `City ${cityIndex}` });

  // Draw the city as a circle
  svg.append("circle")
    .attr("class", "city")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 5)
    .attr("fill", "red");

  // Add a label to the city
  svg.append("text")
    .attr("class", "city-label")
    .attr("x", x + 10)
    .attr("y", y - 10)
    .attr("font-size", 12)
    .attr("fill", "black")
    .text(`City ${cityIndex}`);
}

// Calculate distances between cities
function calculateDistanceMatrix() {
  const distanceMatrix = [];
  for (let i = 0; i < cities.length; i++) {
    distanceMatrix[i] = [];
    for (let j = 0; j < cities.length; j++) {
      if (i === j) {
        distanceMatrix[i][j] = 0;
      } else {
        const dx = cities[i].x - cities[j].x;
        const dy = cities[i].y - cities[j].y;
        distanceMatrix[i][j] = Math.sqrt(dx * dx + dy * dy);
      }
    }
  }
  return distanceMatrix;
}

// TSP Class with Dynamic Programming
class TravellingSalesmanProblem {
  constructor(distanceMatrix, startCity) {
    this.distanceMatrix = distanceMatrix;
    this.n = distanceMatrix.length;
    this.startCity = startCity;
    this.memo = Array.from({ length: this.n }, () => Array(1 << this.n).fill(null));
    this.shortestPath = [];
    this.minPathCost = Infinity;
  }

  tsp(city, visited) {
    if (visited === (1 << this.n) - 1) {
      return this.distanceMatrix[city][this.startCity];
    }

    if (this.memo[city][visited] !== null) {
      return this.memo[city][visited];
    }

    let minCost = Infinity;
    for (let nextCity = 0; nextCity < this.n; nextCity++) {
      if (!(visited & (1 << nextCity))) {
        const newVisited = visited | (1 << nextCity);
        const tourCost = this.distanceMatrix[city][nextCity] + this.tsp(nextCity, newVisited);
        minCost = Math.min(minCost, tourCost);
      }
    }

    this.memo[city][visited] = minCost;
    return minCost;
  }

  findPath(city, visited) {
    this.shortestPath.push(city);
    if (visited === (1 << this.n) - 1) return;

    let minCost = Infinity;
    let nextCity = -1;
    for (let i = 0; i < this.n; i++) {
      if (!(visited & (1 << i))) {
        const newVisited = visited | (1 << i);
        const cost = this.distanceMatrix[city][i] + this.memo[i][newVisited];
        if (cost < minCost) {
          minCost = cost;
          nextCity = i;
        }
      }
    }

    if (nextCity !== -1) {
      this.findPath(nextCity, visited | (1 << nextCity));
    }
  }

  solve() {
    this.minPathCost = this.tsp(this.startCity, 1 << this.startCity);
    this.shortestPath = [];
    this.findPath(this.startCity, 1 << this.startCity);
    this.shortestPath.push(this.startCity);
  }

// Method to generate and display the memoization table with city names as headers
displayMemoizationTable() {
  const tableContainer = document.getElementById('memoization-table-container');
  let tableHTML = '<table id="memoization-table"><thead><tr><th>City</th>';

  // Creating column headers for each city
  for (let i = 0; i < this.n; i++) {
    tableHTML += `<th>City ${i}</th>`; // City names as headers
  }
  tableHTML += '</tr></thead><tbody>';

  // Creating rows for each city and its distances to other cities
  for (let i = 0; i < this.n; i++) {
    tableHTML += `<tr><td>City ${i}</td>`; // City names as rows
    for (let j = 0; j < this.n; j++) {
      const value = this.distanceMatrix[i][j].toFixed(2); // Formatting distances
      tableHTML += `<td>${value}</td>`;
    }
    tableHTML += '</tr>';
  }

  tableHTML += '</tbody></table>';
  tableContainer.innerHTML = tableHTML;
}


}

// Solve TSP and display
function solveTSP() {

  if (cities.length < 2) {
    alert("Please place at least two cities on the map.");
    return;
  }

  const distanceMatrix = calculateDistanceMatrix();
  const startCity = 0;
  const tour = new TravellingSalesmanProblem(distanceMatrix, startCity);
  tour.solve();

  displayPath(tour.shortestPath);
  document.getElementById("shortest-path").textContent = tour.shortestPath.join(" → ");
  document.getElementById("min-path-cost").textContent = tour.minPathCost.toFixed(2);

  // Display the memoization table
  tour.displayMemoizationTable();
}

// Display shortest path with arrows at the midpoint
function displayPath(path) {
  svg.selectAll(".path-line").remove();
  svg.selectAll(".arrow-head").remove();

  for (let i = 0; i < path.length - 1; i++) {
    const startCity = cities[path[i]];
    const endCity = cities[path[i + 1]];

    // Draw the path line
    svg.append("line")
      .attr("class", "path-line")
      .attr("x1", startCity.x)
      .attr("y1", startCity.y)
      .attr("x2", endCity.x)
      .attr("y2", endCity.y)
      .attr("stroke", "blue")
      .attr("stroke-width", 2);

    // Calculate midpoint for the arrow
    const midX = (startCity.x + endCity.x) / 2;
    const midY = (startCity.y + endCity.y) / 2;

    // Add an arrow at the midpoint
    svg.append("path")
      .attr("class", "arrow-head")
      .attr("d", "M-5,-5 L5,0 L-5,5 Z")
      .attr("fill", "blue")
      .attr("transform", `translate(${midX},${midY}) rotate(${Math.atan2(endCity.y - startCity.y, endCity.x - startCity.x) * 180 / Math.PI})`);
  }
}

// Attach the solve button event listener after DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  const solveButton = document.getElementById("solve-btn");
  if (solveButton) {
    solveButton.addEventListener("click", solveTSP);
    console.log('Solve button connected successfully');
  } else {
    console.log('Error: Could not find solve button');
  }

  // Optional: Add a clear/reset button
  const clearButton = document.getElementById("clear-btn");
  if (clearButton) {
    clearButton.addEventListener("click", function() {
      // Clear the cities array
      cities = [];
      // Remove all circles, labels, and paths
      svg.selectAll('.city').remove();
      svg.selectAll('.city-label').remove();
      svg.selectAll('.path-line').remove();
      svg.selectAll('.arrow-head').remove();
      // Clear the results
      document.getElementById('shortest-path').textContent = '';
      document.getElementById('min-path-cost').textContent = '';
      document.getElementById('memoization-table-container').innerHTML = '';  // Clear the table
    });
  }
});
