///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////	


function updateVisualization(accidents){
	$('#trafficAccidents').html(''); // Clear everything

	// day 1, 2, 3, 4, 5
	var days = ["Mo", "Tu", "Wed", "Th", "Fr"],
		times = ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM']

	var margin = {
		top: 120,
		right: 30,
		left: 40
	};

	var width = Math.max(Math.min(window.innerWidth, 1000), 500) - margin.left - margin.right - 200,
		gridSize = Math.floor(width / times.length),
		height = gridSize * (days.length) + 2;

	//SVG container
	var svg = d3.select('#trafficAccidents')
		.append("svg")
		.attr("width", width + margin.left - 2)
		.attr("height", height + margin.top -2)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//Reset the overall font size
	var newFontSize = width * 62.5 / 900;
	d3.select("html").style("font-size", newFontSize + "%");

	///////////////////////////////////////////////////////////////////////////
	//////////////////////////// Draw Heatmap /////////////////////////////////
	///////////////////////////////////////////////////////////////////////////
		
	//Based on the heatmap example of: http://blockbuilder.org/milroc/7014412

	var colorScale = d3.scale.linear()
		.domain([0, d3.max(accidents, function(d) {return d.count; })/2, d3.max(accidents, function(d) {return d.count; })])
		.range(["#FFFFDD", "#3E9583", "#1F2D86"])
		//.interpolate(d3.interpolateHcl);

	var dayLabels = svg.selectAll(".dayLabel")
	    .data(days)
	    .enter().append("text")
	    .text(function (d) { return d; })
	    .attr("x", 0)
	    .attr("y", function (d, i) { return i * gridSize; })
	    .style("text-anchor", "end")
	    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
	    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

	var timeLabels = svg.selectAll(".timeLabel")
	    .data(times)
	    .enter().append("text")
	    .text(function(d) { return d; })
	    .attr("x", function(d, i) { return i * gridSize; })
	    .attr("y", 0)
	    .style("text-anchor", "middle")
	    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
	    .attr("class", function(d, i) { return ((i >= 8 && i <= 17) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

	console.log(accidents);
	var heatMap = svg.selectAll(".hour")
	    .data(accidents)
	    .enter().append("rect")
	    .attr("x", function(d) { 
	    	console.log(d); 
	    	return (d.hour) * gridSize; 
	    })
	    .attr("y", function(d) { 
	    	console.log(d);
	    	return (d.day) * gridSize; 
	    })
	    .on("mouseover", function(d){
	    	console.log(d);
	    })
	    .attr("class", "hour bordered")
	    .attr("width", gridSize)
	    .attr("height", gridSize)
	    .style("stroke", "white")
	    .style("stroke-opacity", 0.6)
	    .style("fill", function(d) { return colorScale(d.count); });

	//Append title to the top
	svg.append("text")
		.attr("class", "title")
	    .attr("x", width/2)
	    .attr("y", -90)
	    .style("text-anchor", "middle")
	    .text("Your Schedule");


	///////////////////////////////////////////////////////////////////////////
	//////////////// Create the gradient for the legend ///////////////////////
	///////////////////////////////////////////////////////////////////////////

	//Extra scale since the color scale is interpolated
	var countScale = d3.scale.linear()
		.domain([0, d3.max(accidents, function(d) {return d.count; })])
		.range([0, width])

	//Calculate the variables for the temp gradient
	var numStops = 10;
	countRange = countScale.domain();
	countRange[2] = countRange[1] - countRange[0];
	countPoint = [];
	for(var i = 0; i < numStops; i++) {
		countPoint.push(i * countRange[2]/(numStops-1) + countRange[0]);
	}//for i

	//Create the gradient
	svg.append("defs")
		.append("linearGradient")
		.attr("id", "legend-traffic")
		.attr("x1", "0%").attr("y1", "0%")
		.attr("x2", "100%").attr("y2", "0%")
		.selectAll("stop") 
		.data(d3.range(numStops))                
		.enter().append("stop") 
		.attr("offset", function(d,i) { 
			return countScale( countPoint[i] )/width;
		})   
		.attr("stop-color", function(d,i) { 
			return colorScale( countPoint[i] ); 
		});

	///////////////////////////////////////////////////////////////////////////
	////////////////////////// Draw the legend ////////////////////////////////
	///////////////////////////////////////////////////////////////////////////

	var legendWidth = Math.min(width*0.8, 400);
	//Color Legend container
	var legendsvg = svg.append("g")
		.attr("class", "legendWrapper")
		.attr("transform", "translate(" + (width/2) + "," + (gridSize * days.length + 40) + ")");

	//Draw the Rectangle
	legendsvg.append("rect")
		.attr("class", "legendRect")
		.attr("x", -legendWidth/2)
		.attr("y", 0)
		//.attr("rx", hexRadius*1.25/2)
		.attr("width", legendWidth)
		.attr("height", 10)
		.style("fill", "url(#legend-traffic)");
		
	//Append title
	legendsvg.append("text")
		.attr("class", "legendTitle")
		.attr("x", 0)
		.attr("y", -10)
		.style("text-anchor", "middle")
		.text("Number of Accidents");

	//Set scale for x-axis
	var xScale = d3.scale.linear()
		 .range([-legendWidth/2, legendWidth/2])
		 .domain([ 0, d3.max(accidents, function(d) { return d.count; })] );

	//Define x-axis
	var xAxis = d3.svg.axis()
		  .orient("bottom")
		  .ticks(5)
		  //.tickFormat(formatPercent)
		  .scale(xScale);

	//Set up X axis
	legendsvg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (10) + ")")
		.call(xAxis);

}

