      //   let cities = []; 
      //   let citiesWord = []
      //   let allRoutes = []; 
      //   let allRoutedata = []
      //   let currentRouteIndex = 0; 
      //   let routeInterval; 
        
      //   const svg = d3.select("#tsp-canvas"); 
      //   const resetBtn = document.getElementById("reset-btn"); 
      //   const solveBtn = document.getElementById("solve-btn"); 
      //   // const shortesteBtn = document.getElementById("shortest-btn"); 
      //   const distnceCon = document.getElementById("distance"); 

      //   distnceCon.classList.add('none')

      //   toggleTableVisibility()

      //   function toggleTableVisibility() {
      //     const routesTable = document.querySelector("#routesTable");
      //     const tbody = document.querySelector("#routesTable tbody");
      //     const noData = document.querySelector(".no-data");
          

      //     if (tbody.rows.length === 0) {
      //         routesTable.style.display = "none"; 
      //         noData.style.display = "flex"; 

      //     } else {
      //         routesTable.style.display = "table"; 
      //         noData.style.display = "none"; 
      //     }
      // }
        
      //   svg.on("click", function (event) {
      //     const [x, y] = d3.pointer(event, this);
      //     const newCity = { id: cities.length, x, y };
      //     cities.push(newCity);
      //     citiesWord.push(`City ${cities.length + 1}`)
      //     drawCity(newCity);
      //     console.log(cities);
      //     console.log(citiesWord);
      //   });
        
      //   function drawCity(city) {
      //     svg.append("circle")
      //       .attr("cx", city.x)
      //       .attr("cy", city.y)
      //       .attr("r", 10)
      //       .attr("fill", "blue");
        
      //     svg.append("text")
      //       .attr("x", city.x + 15)
      //       .attr("y", city.y + 5)
      //       .text(`City ${city.id + 1}`)
      //       .attr("font-size", "12px")
      //       .attr("fill", "black");
      //   }
        
      //   function drawRoute(route, isShortest) {
      //     let color;
      //     if (isShortest) {
      //         color = '#00308F';
      //     } else {
      //         color = getRandomColor();
      //     }

      //     svg.selectAll(".arrowhead").remove();
      
      //     const totalTime = (route.length - 1) * 500 + 500;
      //     console.log(route);
      
      //     for (let i = 0; i < route.length - 1; i++) {
      //         const from = route[i];
      //         const to = route[i + 1];

      //         console.log(route[i]);

      
      //         const distance = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
      
      //         svg.append("line")
      //             .attr("x1", from.x)
      //             .attr("y1", from.y)
      //             .attr("x2", to.x)
      //             .attr("y2", to.y)
      //             .attr("stroke", color)
      //             .attr("stroke-width", 2)
      //             .attr("stroke-dasharray", distance)
      //             .attr("stroke-dashoffset", distance) 
      //             .transition()
      //             .delay(i * 500) 
      //             .duration(500) 
      //             .attr("stroke-dashoffset", 0);
      
      //         const midPoint = {
      //             x: (from.x + to.x) / 2,
      //             y: (from.y + to.y) / 2
      //         };
      
      //         setTimeout(() => drawArrowhead(midPoint, from, to, color), (i * 500) + 500);
      //     }

      //     const k = allRoutedata.length

      //     updateTable(route , k , isShortest)

      //     console.log(allRoutedata);

      //     if(isShortest){
      //       const distanse = (calculateTotalDistance(route) * 0.03).toFixed(2);
      //       distnceCon.innerHTML= `Shortest Route Total Distance -  ${distanse} Km`
      //       distnceCon.classList.remove('none')
      //       distnceCon.classList.add('show')
      //     }
      
      //     if(isShortest){
      //       setTimeout(() => {
      //         enableButtons();
      //       }, totalTime);
      //     }

      //   }

      //   function updateTable(route , k , isShortest){
      //     const path = generatePath(route);
      //     const distance = (calculateTotalDistance(route) * 0.03).toFixed(2)

      //     allRoutedata.push({
      //       route: `Route ${k + 1}`,
      //       path: path,
      //       distance: distance
      //     });
          
      //     const tbody = document.querySelector("#routesTable tbody");

      //     const newRow = document.createElement("tr");

      //     const routeCell = document.createElement("td");
      //     if(isShortest){
      //       routeCell.textContent = `Shortest Path`;
      //     }else{
      //       routeCell.textContent = `Route ${k + 1}`;
      //     }
      //     newRow.appendChild(routeCell);

      //     const pathCell = document.createElement("td");
      //     pathCell.innerHTML = path;
      //     pathCell.classList.add("route-path");
      //     newRow.appendChild(pathCell);

      //     const distanceCell = document.createElement("td");
      //     distanceCell.textContent = `${distance} Km`;
      //     newRow.appendChild(distanceCell);

      //     tbody.appendChild(newRow);
      //     toggleTableVisibility()
      //   }

      //   function generatePath(route) {
      //     let path = ''; 
        
      //     for (let k = 0; k < route.length; k++) {
      //       if (k > 0) {
      //         path += ' -> '; 
      //       }

      //       path += `<span>City ${route[k].id + 1}</span>`;
      //     }
        
      //     return path; // Return the generated path
      //   }
        
      //   function drawArrowhead(midPoint, from, to, color) {
      //     const arrowLength = 13; 

      //     const angle = Math.atan2(to.y - from.y, to.x - from.x);

      //     const x1 = midPoint.x - arrowLength * Math.cos(angle - Math.PI / 6);
      //     const y1 = midPoint.y - arrowLength * Math.sin(angle - Math.PI / 6);
      //     const x2 = midPoint.x - arrowLength * Math.cos(angle + Math.PI / 6);
      //     const y2 = midPoint.y - arrowLength * Math.sin(angle + Math.PI / 6);

      //     svg.append("polygon")
      //       .attr("points", `${midPoint.x},${midPoint.y} ${x1},${y1} ${x2},${y2}`)
      //       .attr("fill", color)    
      //       .attr("class", "arrowhead"); 
      //   }
        
      
      //   function getRandomColor() {
      //     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      //   }
        
      //   // Generate all permutations of cities (excluding City 0)
      //   function permute(arr, l, r) {
      //     console.log("Staring New Function");
      //     console.log("l :", l, "r :", r);
      //     if (l === r) {
      //         const route = [cities[0], ...arr, cities[0]]; 
      //         allRoutes.push(route); 
      //         console.log(allRoutes);
      //     } else {
      //         for (let i = l; i <= r; i++) {
      //             console.log("i :", i, "l :", l);
      //             console.log("before Swap:", JSON.stringify(arr)); 
      //             [arr[l], arr[i]] = [arr[i], arr[l]]; 
      //             console.log("After Swap:", JSON.stringify(arr));
      //             permute(arr, l + 1, r); 
      //             [arr[l], arr[i]] = [arr[i], arr[l]]; 
      //         }
      //     }
      //   }
      
        
      //   function displayRoutesSequentially() {
      //     if (currentRouteIndex >= allRoutes.length) {
      //       distnceCon.classList.add('none')
      //       distnceCon.classList.remove('show')
      //       clearInterval(routeInterval);

      //       // Find the shortest route aftre compute all the routes
      //       findGreedyRoute()
      //       enableButtons()
      //       return;
      //     }

      //     const distanse = (calculateTotalDistance(allRoutes[currentRouteIndex]) * 0.03).toFixed(2);
      //     distnceCon.innerHTML= `Route ${currentRouteIndex + 1} Total Distance -  ${distanse} Km`
      //     distnceCon.classList.remove('none')
      //     distnceCon.classList.add('show')
         
      //     console.log(distanse);

      //     svg.selectAll("line").remove(); 
      //     drawRoute(allRoutes[currentRouteIndex] , false); 
      //     currentRouteIndex++; 
      //   }

      //   // Calculate distance between two cityies
      //   function calculateDistance(cityA, cityB) {
      //     const dx = cityA.x - cityB.x;
      //     const dy = cityA.y - cityB.y;
      //     return Math.sqrt(dx * dx + dy * dy); // Euclidean distance
      //   }

      //   //Calculate the distance of route
      //   function calculateTotalDistance(route) {
      //     let totalDistance = 0;
      
      //     for (let i = 0; i < route.length - 1; i++) {
      //         totalDistance += calculateDistance(route[i], route[i + 1]);
      //     }
          
      //     totalDistance += calculateDistance(route[route.length - 1], route[0]);
          
      //     return totalDistance;
      //   } 
        
      //   // Solve TSP and start displaying routes sequentially
      //   solveBtn.addEventListener("click", () => {
      //     allRoutedata = []
      //     document.querySelector("#routesTable tbody").innerHTML = ''; 
      //     toggleTableVisibility()

      //     if (cities.length < 2) {
      //       alert("Add at least two cities to solve the problem.");
      //       return;
      //     }
        
      //     disableButtons()
      //     allRoutes = [];
      //     currentRouteIndex = 0; 
        
      //     const otherCities = cities.slice(1); 
      //     console.log(otherCities);
      //     permute(otherCities, 0, otherCities.length - 1); 
        
      //     svg.selectAll("*").remove(); 
      //     cities.forEach(drawCity); 

      //     const totTime = cities.length * 700
        
      //     routeInterval = setInterval(displayRoutesSequentially, totTime + 700); 
      //   });

      //   function findGreedyRoute() {
      //     disableButtons()
      //     const visited = new Array(cities.length).fill(false); 
      //     const route = [cities[0]]; 
      //     visited[0] = true; 
        
      //     let currentCity = cities[0];
        
      //     for (let i = 1; i < cities.length; i++) {
      //       let nearestCity = null;
      //       let shortestDistance = Infinity;
     
      //       for (let j = 0; j < cities.length; j++) {
      //         if (!visited[j]) {
      //           const distance = calculateDistance(currentCity, cities[j]);
      //           if (distance < shortestDistance) {
      //             shortestDistance = distance;
      //             nearestCity = cities[j];
      //           }
      //         }
      //       }
        
      //       visited[cities.indexOf(nearestCity)] = true; 
      //       route.push(nearestCity);
      //       currentCity = nearestCity; 
      //     }
        
      //     route.push(cities[0]);
      //     console.log(route);

      //     svg.selectAll("*").remove(); 
      //     cities.forEach(drawCity); 
        
      //     drawRoute(route , true);
      //   }
        
    
      //   resetBtn.addEventListener("click", () => {
      //     allRoutedata = []
      //     document.querySelector("#routesTable tbody").innerHTML = ''; 
      //     toggleTableVisibility()
      //     distnceCon.classList.add('none')
      //     distnceCon.classList.remove('show')
      //     cities = [];
      //     allRoutes = [];
      //     currentRouteIndex = 0;
      //     clearInterval(routeInterval); 
      //     svg.selectAll("*").remove(); 
      //   });
        

      //   function enableButtons() {
      //     console.log("button enabled");
      //     resetBtn.disabled = false;
      //     solveBtn.disabled = false;
      //     // shortesteBtn.disabled = false;

      //     resetBtn.classList.remove('disabled')
      //     solveBtn.classList.remove('disabled')
      //     // shortesteBtn.classList.remove('disabled')

      //   }
        
      //   function disableButtons() {
      //       console.log("button disabled");
      //       resetBtn.disabled = true;
      //       solveBtn.disabled = true;
      //       // shortesteBtn.disabled = true;

            
      //     resetBtn.classList.add('disabled')
      //     solveBtn.classList.add('disabled')
      //     // shortesteBtn.classList.add('disabled')
      //   }

      //        // shortesteBtn.addEventListener("click" , () => {
      //   //   findGreedyRoute()
      //   // })

      let cities = [];
      let currentRouteIndex = 0;
      let routeInterval;
      
      const svg = d3.select("#tsp-canvas");
      const resetBtn = document.getElementById("reset-btn");
      const solveBtn = document.getElementById("solve-btn");
      const distanceCon = document.getElementById("distance");
      
      distanceCon.classList.add('none');
      
      toggleTableVisibility();
      
      function toggleTableVisibility() {
        const routesTable = document.querySelector("#routesTable");
        const tbody = document.querySelector("#routesTable tbody");
        const noData = document.querySelector(".no-data");
      
        if (tbody.rows.length === 0) {
          routesTable.style.display = "none"; 
          noData.style.display = "flex"; 
        } else {
          routesTable.style.display = "table"; 
          noData.style.display = "none"; 
        }
      }
      
      svg.on("click", function (event) {
        const [x, y] = d3.pointer(event, this);
        const newCity = { id: cities.length, x, y };
        cities.push(newCity);
        drawCity(newCity);
      });
      
      function drawCity(city) {
        svg.append("circle")
          .attr("cx", city.x)
          .attr("cy", city.y)
          .attr("r", 10)
          .attr("fill", "blue");
      
        svg.append("text")
          .attr("x", city.x + 15)
          .attr("y", city.y + 5)
          .text(`City ${city.id + 1}`)
          .attr("font-size", "12px")
          .attr("fill", "black");
      }
      
      function drawRoute(route, isShortest) {
        let color = '#00308F'; // Greedy route color
      
        svg.selectAll(".arrowhead").remove();
      
        const totalTime = (route.length - 1) * 500 + 500;
      
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
            .delay(i * 500)
            .duration(500)
            .attr("stroke-dashoffset", 0);
      
          const midPoint = {
            x: (from.x + to.x) / 2,
            y: (from.y + to.y) / 2
          };
      
          setTimeout(() => drawArrowhead(midPoint, from, to, color), (i * 500) + 500);
        }
      
        updateTable(route, isShortest);
      
        if (isShortest) {
          const distance = (calculateTotalDistance(route) * 0.03).toFixed(2);
          distanceCon.innerHTML = `Shortest Route Total Distance -  ${distance} Km`;
          distanceCon.classList.remove('none');
          distanceCon.classList.add('show');
        }
      
        if (isShortest) {
          setTimeout(() => {
            enableButtons();
          }, totalTime);
        }
      }
      
      function updateTable(route, isShortest) {
        const path = generatePath(route);
        const distance = (calculateTotalDistance(route) * 0.03).toFixed(2);
      
        const tbody = document.querySelector("#routesTable tbody");
      
        const newRow = document.createElement("tr");
      
        const routeCell = document.createElement("td");
        routeCell.textContent = isShortest ? `Shortest Path` : `Greedy Route`;
        newRow.appendChild(routeCell);
      
        const pathCell = document.createElement("td");
        pathCell.innerHTML = path;
        pathCell.classList.add("route-path");
        
        newRow.appendChild(pathCell);
      
        const distanceCell = document.createElement("td");
        distanceCell.textContent = `${distance} Km`;
        newRow.appendChild(distanceCell);
      
        tbody.appendChild(newRow);
        toggleTableVisibility();
      }
      
      function generatePath(route) {
        let path = ''; 
      
        for (let k = 0; k < route.length; k++) {
          if (k > 0) {
            path += ' -> '; 
          }
      
          path += `<span>City ${route[k].id + 1}</span>`;
        }
      
        return path; 
      }
      
      function drawArrowhead(midPoint, from, to, color) {
        const arrowLength = 13;
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
      
        const x1 = midPoint.x - arrowLength * Math.cos(angle - Math.PI / 6);
        const y1 = midPoint.y - arrowLength * Math.sin(angle - Math.PI / 6);
        const x2 = midPoint.x - arrowLength * Math.cos(angle + Math.PI / 6);
        const y2 = midPoint.y - arrowLength * Math.sin(angle + Math.PI / 6);
      
        svg.append("polygon")
          .attr("points", `${midPoint.x},${midPoint.y} ${x1},${y1} ${x2},${y2}`)
          .attr("fill", color)
          .attr("class", "arrowhead")
          .attr("stroke", "black") // Added stroke to make arrows more visible
          .attr("stroke-width", 1.5);
      }
      
      function getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      }
      
      function findGreedyRoute() {
        disableButtons();
      
        const visited = new Array(cities.length).fill(false); 
        const route = [cities[0]]; 
        visited[0] = true; 
      
        let currentCity = cities[0];
      
        function visitNextCity() {
          let nearestCity = null;
          let shortestDistance = Infinity;
          let currentArrows = [];
      
          for (let j = 0; j < cities.length; j++) {
            if (!visited[j]) {
              const distance = calculateDistance(currentCity, cities[j]);
      
              // Draw arrow for the comparison
              const arrow = svg.append("line")
                .attr("x1", currentCity.x)
                .attr("y1", currentCity.y)
                .attr("x2", cities[j].x)
                .attr("y2", cities[j].y)
                .attr("stroke", "gray")
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", 5)
                .transition()
                .duration(600)
                .attr("stroke", distance < shortestDistance ? "green" : "red")
                .attr("stroke-dashoffset", 0)
                .transition()
                .delay(500)
                .duration(300)
                .attr("stroke", "transparent");
      
              currentArrows.push(arrow);
      
              if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestCity = cities[j];
              }
            }
          }
      
          // Erase previous arrows and draw the shortest distance arrow
          setTimeout(() => {
            currentArrows.forEach(arrow => {
              arrow.transition()
                .duration(600)
                .attr("stroke", "transparent");
            });
      
            // Draw the final arrow to the nearest city
            if (nearestCity) {
              svg.append("line")
                .attr("x1", currentCity.x)
                .attr("y1", currentCity.y)
                .attr("x2", nearestCity.x)
                .attr("y2", nearestCity.y)
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", 5)
                .transition()
                .duration(600)
                .attr("stroke-dashoffset", 0);
      
              // Move to the nearest city
              visited[cities.indexOf(nearestCity)] = true; 
              route.push(nearestCity);
              currentCity = nearestCity;
            }
      
            // Continue until all cities are visited
            if (route.length < cities.length) {
              setTimeout(visitNextCity, 1000); // Call the function again after a delay
            } else {
              route.push(cities[0]); // Return to the initial city
              svg.selectAll("*").remove();
              cities.forEach(drawCity); 
              drawRoute(route, true);
            }
          }, 1000);
        }
      
        visitNextCity(); // Start the visiting process
      }
      
      function calculateDistance(cityA, cityB) {
        const dx = cityA.x - cityB.x;
        const dy = cityA.y - cityB.y;
        console.log(`Distance between City ${cityA.id + 1} and City ${cityB.id + 1}: ${Math.sqrt(dx * dx + dy * dy)}`);
        return Math.sqrt(dx * dx + dy * dy); 
      }
      
      function calculateTotalDistance(route) {
        let totalDistance = 0;
      
        for (let i = 0; i < route.length - 1; i++) {
          totalDistance += calculateDistance(route[i], route[i + 1]);
        }
      
        totalDistance += calculateDistance(route[route.length - 1], route[0]);
      
        return totalDistance;
      }
      
      solveBtn.addEventListener("click", () => {
        document.querySelector("#routesTable tbody").innerHTML = ''; 
        toggleTableVisibility();
      
        if (cities.length < 2) {
          alert("Add at least two cities to solve the problem.");
          return;
        }
      
        disableButtons();
      
        svg.selectAll("*").remove(); 
        cities.forEach(drawCity); 
      
        findGreedyRoute();
      });
      
      resetBtn.addEventListener("click", () => {
        cities = [];
        svg.selectAll("*").remove(); 
        toggleTableVisibility(); 
        distanceCon.classList.add('none');
      });
        
      function disableButtons() {
        solveBtn.disabled = true;
        resetBtn.disabled = true;
      }
      
      function enableButtons() {
        solveBtn.disabled = false;
        resetBtn.disabled = false;
      }