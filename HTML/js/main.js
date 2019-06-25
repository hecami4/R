var data = [3, 5, 10, 6, 4, 3, 15, 18, 2, 4, 5, 10, 12];
var dataX = [3, 5, 10, 6, 4, 3, 15, 18, 2, 4, 5, 10, 12];
var dataY = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
var dataY1 = [3, 5, 10, 6, 4, 3, 15, 18, 2, 4, 5, 10, 12];
var dataY2 = [5, 6, 11, 2, 5, 3, 13, 10, 5, 3, 5, 6, 7];
var dataY3 = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
var dataY4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var dataC=["a","b","c","d","e","f","g","h","i","j","k","l","m"]
var w = 1024;
var h = 300;
var barPadding = 1;

d3.csv("../MyData.csv", function(data) {
  dataC = data.Country;
  dataX = data.Overall;
  dataY = data.PropertyValue;
  dataY1 = data.PropertyValue;
  dataY2 = data.TaxProfit;
  dataY3 = data.avgStartBusiness;
  dataY4 = data.RegisterinProcedures;
});

var margin = { top: 20, right: 20, bottom: 30, left: 40 };

var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScale = d3
  .scaleBand()
  .domain(d3.range(dataX.length))
  .rangeRound([0, w])
  .paddingInner(0.05);

var xAxis = d3.axisBottom(xScale);

svg
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis);

var yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataY)])
  .range([h, 0]);

var yAxis = d3.axisLeft(yScale);

svg
  .append("g")
  .attr("class", "y axis")
  .call(yAxis);

var colorScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataY)])
  .rangeRound([255, 100]);

svg
  .selectAll("bar")
  .data(dataY)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("fill", function(d) {
    return "rgb( 0,"+ colorScale(d) +",0)";
  })
  .attr("x", function(d, i) {
    return xScale(i);
  })
  .attr("y", function(d) {
    return yScale(d);
  })
  .attr("height", function(d) {
    return h - yScale(d);
  })
  .attr("width", function(d) {
    return xScale.bandwidth();
  });

svg
  .selectAll("textBar")
  .data(dataY)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  .attr("x", function(d, i) {
    return xScale(i) + xScale.bandwidth() / 2;
  })
  .attr("y", function(d) {
    return yScale(d) + 14;
  })
  .attr("class", "textBar");

var updateDataS = function(valor) {
  funcion();
  var infoY = "";
  if (valor == "a") infoY = dataY1;
  if (valor == "b") infoY = dataY2;
  if (valor == "c") infoY = dataY3;
  if (valor == "d") infoY = dataY4;

  console.log("Click Actualizar Datos");
  var dataLengthX = dataX.length;
  data1 = [];
  data3 = [];
  for (var i = 0; i < dataLengthX; i++) {
    data1.push(dataX[i]);
    data3.push(dataC[i]);
  }
  console.log("Nuevos datos X: " + data1);
  xScale.domain(d3.range(dataLengthX));

  var dataLengthY = infoY.length;
  data2 = [];
  for (var i = 0; i < dataLengthY; i++) {
    data2.push(infoY[i]);
  }
  console.log("Nuevos datos Y: " + data2);
  yScale.domain([0, d3.max(data2)]);

  colorScale.domain([0, d3.max(data2)]);

  svg.select(".y.axis").call(yAxis);

    var barTransition = d3
    .transition()
    .duration(300)
    .ease(d3.easeCubicOut);

  svg.select(".x.axis").call(xAxis);

  var bar = svg.selectAll(".bar").data(data2);

  var rectBar = bar
    .enter()
    .append("rect")
    .attr("class", "bar")
    .append("title")
    .attr("class", "tooltip")
    .select(function() {
      return this.parentNode;
    })
    .merge(bar)
    .transition(barTransition)
    .attr("fill", function(d) {
      return "rgb(0,"+ colorScale(d) +",0)";
    })
    .attr("x", function(d, i) {
      return xScale(i);
    })
    .attr("y", function(d) {
      return yScale(d);
    })
    .attr("height", function(d) {
      return h - yScale(d);
    })
    .attr("width", function(d) {
      return xScale.bandwidth();
    });

  rectBar.select(".tooltip").text(function(data3, i) {
    return "x:" + i + ",y:" + data3;
  });

  bar.exit().remove();

  var textBar = svg.selectAll(".textBar").data(data2);

  textBar
    .enter()
    .append("text")
    .attr("class", "textBar")
    .merge(textBar)
    .transition(barTransition)
    .text(function(d) {
      return d;
    })
    .attr("x", function(d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d) {
      return yScale(d) - 2;
    });

  textBar.exit().remove();
};
