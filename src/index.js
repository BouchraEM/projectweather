function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    "december"
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
  let apiKey = "d6bab84013f7f8a5c571bc4c8ee836f6";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(showTemprature);
}

//for updating the weather results
function showTemprature(response) {
  let temprature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let cityResult = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  //let weatherEm = response.data.weather[0].icon;
  // let weatherEmoji = document.querySelector("#weatherEmoji");
  let searchedCity = document.querySelector("#runCity");
  let descriptionElement = document.querySelector("#weather-description");
  let tempratureElement = document.querySelector("#currentTemprature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  //weatherEmoji.innerHTML = weatherEm;
  tempratureElement.innerHTML = temprature;
  descriptionElement.innerHTML = description;
  searchedCity.innerHTML = cityResult;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} Km h`;
  //console.log(response);
}

let city = document.querySelector("#enterCity");
city.addEventListener("submit", getCity);

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
  let apiKey = "d6bab84013f7f8a5c571bc4c8ee836f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemprature);
}

function fahrenheitDegrees(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#currentTemprature");
  let fahTemp = Math.round((fahrenheit.innerHTML * 9) / 5 + 32);
  fahrenheit.innerHTML = `${fahTemp}°F`;
}
//dit moet enkel v eranderen als ik op F druk
let fahrenheitButton = document.querySelector("#buttonF");
fahrenheitButton.addEventListener("click", fahrenheitDegrees);
// hier willen wij eigenlkijk buttonC automatisch verbinden aan function ShowTemprature
let celciusButton = document.querySelector("#buttonC");
celciusButton.addEventListener("click", showTemprature);

let buttonCurrent = document.querySelector("#current-location");
buttonCurrent.addEventListener("click", currentPosition);
