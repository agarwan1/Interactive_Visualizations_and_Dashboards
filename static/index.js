//References
var $sampleInfoPanel = document.querySelector("#sample-metadata");

var $defaultSample = "BB_940";

function init(){
  // sample metadata panel
  //url = "/metadata/" + $defaultSample
  url = "/metadata/BB_940"
  d3.json(url, function(error, response){
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
      for (var i=0; i<responseKeys.length; i++){
          var $p = document.createElement('p');
          $p.innerHTML = responseKeys[i] + ": " + response[responseKeys[i]];
          $sampleInfoPanel.appendChild($p);
      }

  });

//};
//end init

//When route = "/samples/BB_940"
//Plotly.d3.json("samples/" + $defaultSample, function(error, samp_response){
Plotly.d3.json('samples/BB_940', function(error, samp_response){
  if (error) return console.warn(error);
  console.log(samp_response);
  labels = samp_response.otu_ids.slice(0,10);
  vals = samp_response["sample_values"].slice(0,10);

  //set up data for pie chart
  var data = [{
    values: labels,
    labels: vals,
    hoverinfo: {bordercolor: 'black'},
    type: 'pie'
  }];
  console.log("data: " + data);
  var layout = {
    title: "Samples"};

  var PIE = document.getElementById('pie');
  Plotly.plot(PIE,data,layout);
});
} //new end init

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