function formatDate(timestamp) {
  let date = new Date(timestamp);
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
    "December",
  ];

  let day = date.getDate();
  let dayNames = date.getDay();
  let currDay = days[dayNames];
  let currYear = date.getFullYear();
  let currHours = date.getHours();
  let currMinutes = date.getMinutes();
  let currMonth = months[date.getMonth()];

  if (currHours <= 9) {
    currHours = `0${currHours}`;
  }
  if (currMinutes <= 9) {
    currMinutes = `0${currMinutes}`;
  }

  return `${day} ${currMonth} (${currDay}), ${currYear}. As of ${currHours}:${currMinutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]}`;
}

function formatDaySun(timestamp) {
  let date = new Date(timestamp);
  let sunHours = date.getHours();
  let sunMinutes = date.getMinutes();

  if (sunHours <= 12) {
    sunHours = `0${sunHours}`;
  }
  if (sunMinutes <= 9) {
    sunMinutes = `0${sunMinutes}`;
  }
  return `${sunHours}:${sunMinutes}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row-cols-6 hover">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="shadow-sm p-2 mb-3 bg-body rounded">
       <div class="col-2 border-bottom">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="90"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-max">${Math.round(
              forecastDay.temp.max
            )}℃ </span>
            <span class="weather-forecast-min">${Math.round(
              forecastDay.temp.min
            )}℃</span>
          </div>
        </div>
     </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `dde9b965cc7ffe04e803055c1a479def`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let cityN = response.data.name;
  let countryW = response.data.sys.country;
  let header = document.querySelector("#type-c-c");
  let temperatureEl = document.querySelector("#temp-result");
  let realFeels = document.querySelector("#feels");
  let descriptionT = document.querySelector("#description");
  let windS = document.querySelector("#wind");
  let humidityP = document.querySelector("#humidity");
  let dateEl = document.querySelector("#full-date");
  let sunriseUp = document.querySelector("#sunrise");
  let sunsetDown = document.querySelector("#sunset");
  let iconEl = document.querySelector("#icon");

  header.innerHTML = `${cityN}, ${countryW}`;
  temperatureEl.innerHTML = Math.round(response.data.main.temp);
  realFeels.innerHTML = Math.round(response.data.main.feels_like);
  descriptionT.innerHTML = response.data.weather[0].description;
  windS.innerHTML = Math.round(response.data.wind.speed);
  humidityP.innerHTML = response.data.main.humidity;
  dateEl.innerHTML = formatDate(response.data.dt * 1000);
  sunriseUp.innerHTML = formatDaySun(response.data.sys.sunrise * 1000);
  sunsetDown.innerHTML = formatDaySun(response.data.sys.sunset * 1000);

  iconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconEl.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  temperatureEl.innerHTML = Math.round(celsiusTemperature);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `dde9b965cc7ffe04e803055c1a479def`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let newTempElement = document.querySelector("#temp-result");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  newTempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let newTempElement = document.querySelector("#temp-result");
  newTempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");

celsiusLink.addEventListener("click", displayCelsiusTemp);
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("Odesa");
