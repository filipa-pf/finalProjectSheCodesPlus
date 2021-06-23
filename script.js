let now = new Date();

function formatDate(now) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

  let dateResult = `${day}, ${now.getDate()} ${month}`;

  return dateResult;
}

function formatHours(now) {
  let showHour = `${now.getHours()}:${now.getMinutes()}`;
  if (now.getMinutes() < 10) {
    return (showHour = `${now.getHours()}:0${now.getMinutes()}`);
  } else {
    return showHour;
  }
}

console.log(formatDate(now));
console.log(formatHours(now));

let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(now);

let h3 = document.querySelector("h3");
h3.innerHTML = formatHours(now);

function showWeather(response) {
  document.querySelector("#placeInPage").innerHTML = response.data.name;
  document.querySelector("#showTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;

  defaultCity(city);
}

function defaultCity(city) {
  let apiKey = "bcd6bffb67c533bc97521b927a7799b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function getCurrent(position) {
  let apiKey = "bcd6bffb67c533bc97521b927a7799b4";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrent);
}

let currentCityWeather = document.querySelector("#btn2");
currentCityWeather.addEventListener("click", showCurrentWeather);

let searchedCity = document.querySelector("#city-form");
searchedCity.addEventListener("submit", showCity);

defaultCity("London");
