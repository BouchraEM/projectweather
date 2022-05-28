function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "januari",
    "februari",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = now.getDate();
  let day = days[now.getDay()];
  let year = now.getFullYear();
  let month = months[now.getMonth()];

  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = ` ${day} ${currentDate} ${month} ${year} ${hours}:${minutes}`;
}
formatDate();
//----------------------------
// for making enter your city works
function getCity(event) {
  event.preventDefault();

  let searchCity = document.querySelector("#search-your-city");
  let showCity = document.querySelector("#runCity");
  if (searchCity.value) {
    showCity.innerHTML = `${searchCity.value}`;
  } else {
    alert("Please typ your city!");
  }
  let apiKey = "828e96917af7c1950c0c337f1d484fba";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(showTemprature);
}
//days of the weatherpredictions
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
// weatherforecast van onderen
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
    <div class="col-2">
          <img 
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" 
            alt=" "  
            width="42" 
            />
            <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
          <div class="forecast-temperature-minmax">
            <span class="forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//coordinates for weatherpredictions
function getForecast(coordinates) {
  let apiKey = "828e96917af7c1950c0c337f1d484fba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//for updating the weather results
function showTemprature(response) {
  let description = response.data.weather[0].description;
  let cityResult = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  celsiusTemprature = Math.round(response.data.main.temp);
  let temprature = celsiusTemprature;
  let searchedCity = document.querySelector("#runCity");
  let descriptionElement = document.querySelector("#weather-description");
  let tempratureElement = document.querySelector("#currentTemprature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let weatherEmoji = document.querySelector("#weatherEmoji");
  weatherEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  tempratureElement.innerHTML = temprature;
  descriptionElement.innerHTML = description;
  searchedCity.innerHTML = cityResult;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} `;

  getForecast(response.data.coord);
  //console.log(response);
}
// for the position
function currentPosition(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#search-your-city");
  searchResult.value = "";
  navigator.geolocation.getCurrentPosition(showPosition);
}
//to make currentPosition function work when i press current.
function showPosition(position) {
  let long = position.coords.longitude;
  let lati = position.coords.latitude;
  let apiKey = "828e96917af7c1950c0c337f1d484fba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemprature);
}

function fahrenheitDegrees(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#currentTemprature");
  //remove celsiusbutton
  celciusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
  let fahTemp = Math.round((celsiusTemprature * 9) / 5 + 32);
  fahrenheit.innerHTML = `${fahTemp}`;
}
function celsiusDegrees(event) {
  event.preventDefault();
  let celcius = document.querySelector("#currentTemprature");
  celcius.innerHTML = celsiusTemprature;
  celciusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
}

// dit is voor Cbuuton
let celsiusTemprature = "00";

//dit moet enkel v eranderen als ik op F druk
let fahrenheitButton = document.querySelector("#buttonF");
fahrenheitButton.addEventListener("click", fahrenheitDegrees);

// hier willen wij eigenlkijk buttonC automatisch verbinden aan function ShowTemprature
let celciusButton = document.querySelector("#buttonC");
celciusButton.addEventListener("click", celsiusDegrees);

let buttonCurrent = document.querySelector("#current-location");
buttonCurrent.addEventListener("click", currentPosition);

let city = document.querySelector("#enterCity");
city.addEventListener("submit", getCity);
