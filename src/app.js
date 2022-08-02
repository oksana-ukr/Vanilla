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

  let day = date.getDay();
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let dayForecast = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let forecastHTML = `<div class="row hover">`;
  dayForecast.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="shadow-sm p-2 mb-3 bg-body rounded">
       <div class="col border-bottom">
          <div class="weather-forecast-date">${day}</div>
          <img
            src="http://openweathermap.org/img/wn/04d@2x.png"
            alt=""
            width="37"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-max">25° /</span>
            <span class="weather-forecast-min">15°</span>
          </div>
        </div>
     </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function showTemperature(response) {
  let cityN = response.data.name;
  let countryW = response.data.sys.country;
  let header = document.querySelector("#type-c-c");
  header.innerHTML = `${cityN}, ${countryW}`;

  let temperatureEl = document.querySelector("#temp-result");
  temperatureEl.innerHTML = Math.round(response.data.main.temp);

  let realFeels = document.querySelector("#feels");
  realFeels.innerHTML = Math.round(response.data.main.feels_like);

  let descriptionT = document.querySelector("#description");
  descriptionT.innerHTML = response.data.weather[0].description;

  let windS = document.querySelector("#wind");
  windS.innerHTML = Math.round(response.data.wind.speed);
  let humidityP = document.querySelector("#humidity");
  humidityP.innerHTML = response.data.main.humidity;

  let dateEl = document.querySelector("#full-date");
  dateEl.innerHTML = formatDate(response.data.dt * 1000);

  let iconEl = document.querySelector("#icon");
  iconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconEl.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  temperatureEl.innerHTML = Math.round(celsiusTemperature);
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
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("Odesa");
displayForecast();
