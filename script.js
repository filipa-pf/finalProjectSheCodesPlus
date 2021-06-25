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

function formatWeekDay(timeStamp){
let date = new Date(timeStamp * 1000);
let day = date.getDay();
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data);
  let forecastElement = document.querySelector("#forecastElement");
  
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
    {forecastHTML = forecastHTML + `
              <div class="col">
                <div class="week-day">
                ${formatWeekDay(forecastDay.dt)}
                </div>
                
                  <div><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                      alt="weather-symbol"
                      id="icon-forecast"/>
                  </div>
                  <div>
                    <span id="forecast-temp-min" class="weather-forecast-min">${Math.round(forecastDay.temp.min)}º-</span><span id="forecast-temp-max" class="weather-forecast-max">${Math.round(forecastDay.temp.max)}º</span>
                  </div>
              </div>`;       
    }
  
            });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}

function getForecast(coordinates){

let apiKey = "bcd6bffb67c533bc97521b927a7799b4";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  document.querySelector("#placeInPage").innerHTML = response.data.name;
  document.querySelector("#showTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#condition").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
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

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#showTemperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#showTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let currentCityWeather = document.querySelector("#btn2");
currentCityWeather.addEventListener("click", showCurrentWeather);

let searchedCity = document.querySelector("#city-form");
searchedCity.addEventListener("submit", showCity);


let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);


let celsiusTemperature = null;

defaultCity("London");
