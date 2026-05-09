$(document).ready(function() {
  $("#btn").text("Retrieving Location...").removeClass("btn btn-lg btn-outline-info").removeAttr("href");
  $("#weather").hide();
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    console.log(position.coords.latitude, position.coords.longitude);
  });
  var api = "https://weather-proxy.freecodecamp.rocks/api/current?";
  var lat, lon;
  setTimeout(function() {
    $("#btn").text("Get Forecast").addClass("btn btn-lg btn-outline-info").attr("href");
   }, 9000);

  $("#btn").on("click", function() {
    $("#weather").show();
    $("#btn").hide();
    console.log("hello");

    var url = api + "lat=" + lat + "&lon=" + lon;
    console.log(url);
    $.getJSON(url).done(function(data) {
      var tempC = Math.round(data.main.temp) + String.fromCharCode(176) + "C";
      var tempF = Math.round((data.main.temp) * (9 / 5) + 32) + String.fromCharCode(176) + "F";
      $("#city").text(data.name + ", ");
      $("#country").text(data.sys.country);
      $("#temp").text(tempF);
      $("#description").text(data.weather[0].description);
      $("#icon").html("<img src =" + "'" + data.weather[0].icon + "'>");
      $("#humidity").text(data.main.humidity + String.fromCharCode(37));

      $("#temp").on("click", function(){
       if($("#temp").text() == tempF){
         $("#temp").text(tempC);
       }else {
         $("#temp").text(tempF);
       }
      });
    });
  });

});
