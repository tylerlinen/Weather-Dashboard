//on click function
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  $("#today").empty();
  $("#forecast").empty();


  var city = $("#citySearch").val();
  console.log(city);

  getWeather(city)

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

      var temp = $("<h3>").text(response.main.temp);
      var wind = $("<h3>").text(response.wind.speed);
      var humid = $("<h3>").text(response.main.humidity);




      cardBody.append(temp)
      cardBody.append(wind)
      cardBody.append(humid)



      cardTitle.append(cardIcon)
      $("#today").append(card.append(cardBody.append(cardTitle)))

      getUVI(response.coord.lat, response.coord.lon)
      getForecast(city)
    });
}

function getForecast(searchValue) {
  var APIKey = "e2284c98c4a79fae5fbaee15f0e63c67";

  var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${APIKey}&units=imperial`;

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response)



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
      console.log(response.current.uvi)
      var uv = $("<h3>").text(response.current.uvi);
      $("#today").append(uv);


      //Times and Dates
      for (var i = 1; i < 6; i++) {
        console.log(response.daily[i])


        var card2 = $("<div>").addClass("card");
        var cardBody2 = $("<div>").addClass("card-body");
        var cardTitle2 = $("<h2>").addClass("card-title").text(timeEl);

        var timeEl = moment.unix(response.daily[i].dt).format("dddd, MMMM Do");
        var timeIl = moment.unix(response.daily[0].dt).format("dddd, MMMM Do");

        $("#today").append(timeIl);

        $("#forecast").append(card2.append(cardBody2.append(cardTitle2)))


      }
    }
  });
}


