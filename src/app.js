function showTemperature(response) {
  console.log(response.data.sunset);
  console.log(response.data.sys.sunrise);

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
}

let apiKey = `dde9b965cc7ffe04e803055c1a479def`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Odesa&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
