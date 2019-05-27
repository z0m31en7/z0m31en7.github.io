$(document).ready(function() {
  var mspf = 60; // MS per frame
  var trailLen = 24; // Characterss per 'strand'
  var spawnTime = 20;
  var theLetters = "0111101000110000011011010011001100110001011001010110111000110111"; // Change this with your own text


  var fadeTime = mspf * trailLen * 2; // time until trail.remove()
  function rain() {
    var randId = Math.floor(Math.random() * 1000);
    myFun(trailLen, randId);


    setInterval(function() {
      $("div[id=" + randId + "]").remove();
    }, fadeTime);
  }

  function myFun(c, uid) {
    var id = "";
    setTimeout(function() {
      if (c == trailLen) {
        var y = Math.floor(Math.random() * ($("#out").height() / 10)) * 12; // height / 10 * 12 ensures a small space between trails, and also prevents overlapping (in theory) 
        var x = Math.floor(Math.random() * ($("#out").width() / 10)) * 12;
        var scale = (Math.random() * 12) + 8;
        $("#out").append("<div style='font-size:" + scale + "px;top:" + y + "px;left:" + x + "px;' class='trail' id='" + uid + "'></div>"); // add .trail
      }
      if (--c) {
        myFun(c, uid);
      }
      $("div[id=" + uid + "]").append("<span>" + theLetters.substr(Math.floor(Math.random() * theLetters.length), 1) + "</span><br>"); // adds spans to .trail 
    }, mspf)
  };

  setInterval(rain, spawnTime);
});
