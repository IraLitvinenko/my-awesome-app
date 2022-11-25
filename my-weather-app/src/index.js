let today = document.querySelector("#myDate");
let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function hours_with_zeros(now) {
  if (now.getHours() < 10) {
    return "0" + now.getHours();
  } else {
    return now.getHours();
  }
}
function minutes_with_zeros(now) {
  if (now.getMinutes() < 10) {
    return "0" + now.getMinutes();
  } else {
    return now.getMinutes();
  }
}
let day = days[now.getDay()];
let currentDay =
  day + " " + hours_with_zeros(now) + ":" + minutes_with_zeros(now);
today.innerHTML = currentDay;

function showtemperature(response) {
  console.log(response.data.main.temp);
  let temperatureElement = Math.round(response.data.main.temp);
  let cityWeather = document.querySelector("#currentTemperature");
  cityWeather.innerHTML = `${temperatureElement}`;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;
}

function myCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#my-city");
  console.log(searchCity.value);
  let City = document.querySelector("#currentCity");
  City.innerHTML = `${searchCity.value.toUpperCase()} `;
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value.toLowerCase()}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showtemperature);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", myCity);

function showCurrentTemperature(response) {
  console.log(Math.round(response.data.main.temp));
  let myWeather = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = `${myWeather}`;
}

function showPosition(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  console.log(position.name);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let cityName = position.name;
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  let currentCity = document.querySelector("currentCity");
  currentCity.innerHTML = `${cityName}`;
  let SearchCurrentCity = document.querySelector("#my-city");
  let SearchCurrentCityValue = `${SearchCurrentCity.value}`;
  SearchCurrentCityValue = document.querySelector("#my-city").value;
  SearchCurrentCityValue.innerHTML = `${cityName}`;

  axios.get(apiUrl).then(showCurrentTemperature);
}

let current = document.querySelector("#search-form");
current.addEventListener("submit2", showPosition);
navigator.geolocation.getCurrentPosition(showPosition);
