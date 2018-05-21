//References
var $sampleInfoPanel = document.querySelector("#sample-metadata")

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
          var $dataPoint = document.createElement('p');
          $dataPoint.innerHTML = responseKeys[i] + ": " + response[responseKeys[i]];
          $sampleInfoPanel.appendChild($dataPoint)
      };

  });

};
//end init

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

}
//end optionChanged

init(defaultSample);