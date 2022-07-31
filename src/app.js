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
}

let apiKey = `dde9b965cc7ffe04e803055c1a479def`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Odesa&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
