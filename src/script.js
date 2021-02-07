function formateDate(date){
    let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    let day = days[date.getDay()];

    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day}, ${hour}:${minutes}`;
    }   

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    let cityElement = document.querySelector("#city-name");
    cityElement.innerHTML = searchInput.value;
}

function displayWeatherCondition(response) {
  let tempElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let weatherIconElement = document.querySelector("#weather-icon");

  celsiusTemperature = Number(response.data.main.temp);
  let roundedTemp = Math.round(celsiusTemperature);

  tempElement.innerHTML = `${roundedTemp}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(response);
}

function updateCityAndWeatherWhenSearch(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#search-text-input").value;
    if(inputCity.length > 0){
        displayWeatherBasedOnCity(inputCity);
    }
}

function formatHours(timestamp){
    let date = new Date(timestamp);
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hour}:${minutes}`;
}

function displayWeatherForecast(response){
    let forecastElement = document.querySelector("#weather-forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2" align="center">
        <h6>
        ${formatHours(forecast.dt*1000)}
        </h6>
        <img class = "weather-forecast-icon"
        style = "width: 60px;"
        src = "http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
        }@2x.png"
        />
        <div class="weather-forecast-temperature">
            <strong>
            ${Math.round(forecast.main.temp_max)}°
            </strong>
            <span style= "font-size: 12px;">${Math.round(forecast.main.temp_min)}°</span>
        </div>
    </div>
    `;   
        
    }
}

function displayWeatherBasedOnCity(city) {
    let apiKey = "f7f2f10d7d1c65f4aa2b4e518e688029";
    let cityElement = document.querySelector("#city-name");
    cityElement.innerHTML = city;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeatherCondition);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeatherForecast);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

// Update date
let currentTime = new Date();
let link = document.querySelector("#date");
link.innerHTML = formateDate(currentTime);

// Default location and temperature when loading page
displayWeatherBasedOnCity("Paris");

// Update location and temperature when searching for place
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCityAndWeatherWhenSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);