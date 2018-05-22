//References
var $sampleInfoPanel = document.querySelector("#sample-metadata");

var defaultSample = "BB_940";

function init() {
  // sample metadata panel
  //url = "/metadata/" + defaultSample
  url = "/metadata/BB_940"
  d3.json(url, function (error, response) {
    if (error) return console.log(error);
    //console.log(response);
    // get list of keys from response
    var responseKeys = Object.keys(response);
    //console.log(keys);

    // // identify correct div
    // var $sampleInfoPanel = document.querySelector("#sample-metadata");

    // // reset HTML to be nothing
    // $sampleInfoPanel.innerHTML = null;

    // loop through response keys and create a P element for each including
    // response key and value
    for (var i = 0; i < responseKeys.length; i++) {
      var $p = document.createElement('p');
      $p.innerHTML = responseKeys[i] + ": " + response[responseKeys[i]];
      $sampleInfoPanel.appendChild($p);
    }

  });

  //};
  //end init

  //When route = "/samples/BB_940"
  //samples route needs pie chart and bubble chart. 
  //Plotly.d3.json("samples/" + defaultSample, function(error, samp_response){
  Plotly.d3.json('samples/BB_940', function (error, samp_response) {
    if (error) return console.warn(error);
    console.log(samp_response);
    labels = samp_response.otu_ids.slice(0, 10);
    vals = samp_response["sample_values"].slice(0, 10);

    //Pie Chart needs OTU descriptions as hovertext for chart. Get matching descriptions and create a list
    var bacteriaNamesPie = []
    for (var i = 0; i < labels.length; i++) {
      bacteriaNamesPie.push(samp_response[labels[i]])
    }
    console.log(bacteriaNamesPie)
    //set up data for pie chart
    var data = [{
      values: labels,
      labels: vals,
      hovertext: bacteriaNamesPie,
      hoverinfo: {
        bordercolor: 'black'
      },
      type: 'pie'
    }];
    console.log("data: " + data);
    var layout = {
      title: "Samples"
      // showlegend: true,
      // legend: {
      //   x: 100,
      //   y: 1,
      //   traceorder: 'normal',
      //   font: {
      //     family: 'sans-serif',
      //     size: 12,
      //     color: '#000'
      //   },
      //   bgcolor: '#E2E2E2',
      //   bordercolor: '#FFFFFF',
      //   borderwidth: 2
      // }

    };


    var PIE = document.getElementById('pie');
    Plotly.plot(PIE, data, layout);
  });

  //Bubble Chart 

  Plotly.d3.json('samples/BB_940', function (error, bubble_response) {
    var bubbleDiv = document.getElementById("bubble-chart");
    //if (error) return console.warn(error);
    console.log(bubble_response);
    var trace1 = {
      type: "scatter",
      mode: "markers",
      x: bubble_response.otu_ids, //.slice(0,10),
      y: bubble_response.sample_values, //slice(0,10),
      marker: {
        colorscale: 'Viridis', //Earth
        //color: bubble_response.otu_ids, //.slice(0,10),
        size: bubble_response.sample_values,
        sizemode: 'area' //default is diameter, use area for bubble charts
        //size: bubble_response.sample_values //.slice(0,10) //["sample_values"]
      },
    };
    var bubdata = [trace1];
    var bublayout = {
      title: "Bubble Chart",
      // hovermode: 'closest',
      // showlegend: false,
      // height: 600,
      // margin:
      // {
      //   top: 10,
      //   bottom: 10,
      //   right: 10,
      //   left: 10
      // }
    }
    //};
    Plotly.plot(bubbleDiv, bubdata, bublayout);
  }) //;



}; //new end init

function optionChanged(val) {
  defaultSample = val;
  // Plotly.d3.json('/names'), function(error, response){
  //   if (error) return console.warn(error);
  //   select = document.getElementById('selData');

  // }
};

// handle change in dropdown
// function optionChanged(chosenSample){

//   d3.json("/metadata/" + chosenSample, function(error, response){

//       if (error) return console.warn(error);

//       console.log(response);

//       var responseKeys = Object.keys(response);

//       console.log(responseKeys);

//       var $sampleInfoPanel = document.querySelector("#sample-metadata");

//       $sampleInfoPanel.innerHTML = null;

//       for (var i=0; i<responseKeys.length; i++){
//           var $dataPoint = document.createElement('p');
//           $dataPoint.innerHTML = responseKeys[i] + ": " + response[responseKeys[i]];
//           $sampleInfoPanel.appendChild($dataPoint);
//       }

// });
//end optionChanged

init();