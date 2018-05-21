// create dropdown from Flask API
d3.json("/names", function(error, response) {

  if (error) return console.warn(error);

  // console.log(response);

  var $dropDown = document.getElementById("selDataset")

  for (var i=0; i< response.length; i++){
      var $optionChoice = document.createElement("option");
      $optionChoice.innerHTML = response[i];
      $optionChoice.setAttribute("value", response[i]);
      $dropDown.appendChild($optionChoice);
  }
});

// set intial values and graphs on the page
var defaultSample = "BB_940"

function init(sample){
    // sample metadata panel
    d3.json("/metadata/" + sample, function(error, response){
        if (error) return console.warn(error);

        // get list of keys from response
        var responseKeys = Object.keys(response);

        // identify correct div
        var $sampleInfoPanel = document.querySelector("#sample-metadata");
       
        // reset HTML to be nothing
        $sampleInfoPanel.innerHTML = null;

        // loop through response keys and create a P element for each including
        // response key and value
        for (var i=0; i<responseKeys.length; i++){
            var $p = document.createElement("p")
            //var $dataPoint = document.createElement('p');
            $dataPoint.innerHTML = responseKeys[i] + ": " + response[responseKeys[i]];
            $sampleInfoPanel.appendChild($dataPoint)
        };

    });

// handle change in dropdown
function optionChanged(chosenSample){
   
  d3.json("/metadata/" + chosenSample, function(error, response){

      if (error) return console.warn(error);

      console.log(response);

      var responseKeys = Object.keys(response);

      console.log(responseKeys);

      var $sampleInfoPanel = document.querySelector("#sample-metadata");

      $sampleInfoPanel.innerHTML = null;

      for (var i=0; i<responseKeys.length; i++){
          var $dataPoint = document.createElement('p');
          $dataPoint.innerHTML = responseKeys[i] + ": " + response[responseKeys[i]];
          $sampleInfoPanel.appendChild($dataPoint)
      };
      


  })

  init(defaultSample);