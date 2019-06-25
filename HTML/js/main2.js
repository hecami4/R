var w = 1024;
var h = 300;
var barPadding = 1;


d3.csv("../MyData.csv", function(data) {
  console.log(data)

  dataX = data.Overall;
  dataY = data.PropertyValue;
  dataY1 = data.PropertyV;
  dataY2 = data.PayTax;
  dataY3 = data.StarBusiness;
  dataY4 = data.RegisterPropertyN;
});
