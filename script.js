//on click function
$(document).ready(function(){
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  $("#today").empty();
  $("#forecast").empty();


  var city = $("#citySearch").val();
  console.log(city);

  getWeather(city);
  makeRow(city)

});


// Here we run our AJAX call to the OpenWeatherMap API
function getWeather(city) {
  var APIKey = "e2284c98c4a79fae5fbaee15f0e63c67";

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
    city + "&appid=" + APIKey + "&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "json"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the resulting object
      console.log(response);
      var card = $("<div>").addClass("card");
      var cardBody = $("<div>").addClass("card-body");
      var cardTitle = $("<h2>").addClass("card-title").text(response.name);

      var cardIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

      var temp = $("<h3>").text("Temp is: " + response.main.temp);
      var wind = $("<h3>").text("Wind Speed is:" + response.wind.speed);
      var humid = $("<h3>").text("Humudity is:" + response.main.humidity);


    
      $("#today").append(card.append(cardBody.append(cardTitle.append(cardIcon), temp, wind, humid,)))


      getUVI(response.coord.lat, response.coord.lon)
      getForecast(response.coord.lat, response.coord.lon)
    });
}

function getForecast(lat,lon) {
  var APIKey = "e2284c98c4a79fae5fbaee15f0e63c67";

  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response)
      for(var i = 1; i < 6; i++) {
        console.log(response.daily[i])


        var time = moment.unix(response.daily[i].dt).format("MM DD YYYY")
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var title = $("<h1>").addClass("card-title").text(time)
        

         $("#forecast").append(card.append(cardBody.append(title.append("Temp:" + response.daily[i].temp.day,"Humidity:" + response.daily[i].humidity))))
      }



    }
  })
}

function getUVI(lat, lon) {
  var APIKey = "e2284c98c4a79fae5fbaee15f0e63c67";

  // Here we are building the URL we need to query the database
  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response)
      var uv = $("<h3>").text(response.current.uvi);

      $("#today").append(uv);

      var card2 = $("<div>").addClass("card");
      var cardBody2 = $("<div>").addClass("card-body");
      var cardTitle2 = $("<h2>").addClass("card-title");

      $("#forecast").append(card2.append(cardBody2.append(cardTitle2)))


    }
  });
}

function makeRow(text) {
  var li = $("<li>").addClass("list-group-item").text(text);
  $("#cityList").append(li)
}

    


});



