// svg container
var svgHeight = 400;
var svgWidth = 1000;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
var svg = d3.select("#scatter").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// shift everything over by the margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
 
// scale y to chart height
var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataArray)])
  .range([chartHeight, 0]);

// scale x to chart width
var xScale = d3.scaleBand()
  .domain(dataCategories)
  .range([0, chartWidth])
  .padding(0.05);

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

// set y to the y axis
// This syntax allows us to call the axis function
// and pass in the selector without breaking the chaining
chartGroup.append("g")
  .call(yAxis);

// Load data from data.csv
d3.csv("assets/data/data.csv", function(error, healthData) {
  if (error) return console.warn(error);

  console.log(healthData);
  
  // log a list of names
  var states = healthData.map(data => data.abbr);
  console.log("state", states);

  // Cast the hours value to a number for each piece of tvData
  healthData.forEach(function(data) {
    poverty = (data.poverty = +data.poverty);
	healthcareLow = (data.healthcareLow = +data.healthcareLow);
	
  });


// Append Data to chartGroup
chartGroup.selectAll(".chart")
  .data(dataArray)
  .enter()
  .append("rect")
  .classed("scatter", true)
  .attr("x", (d, i) => xScale(poverty[i]))
  .attr("y", (d, j) => yScale(healthcareLow[j]))
});