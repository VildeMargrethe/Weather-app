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

// Update date
let currentTime = new Date();
let link = document.querySelector("#date");
link.innerHTML = formateDate(currentTime);

// let user search for city
//let form = document.querySelector("#search-form");
//form.addEventListener("submit", search);
   
// Update city name and temperature when searching for a city

function showCurrentLocationandWeather(response) {
  let temperature = Number(response.data.main.temp);
  let roundedTemp = Math.round(temperature);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${roundedTemp}`;

  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;
}

function findLocation(position) {
  let apiKey = "f7f2f10d7d1c65f4aa2b4e518e688029";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentLocationandWeather);
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
    displayWeatherBasedOnCity(inputCity);
}

function displayWeatherBasedOnCity(city) {
    let apiKey = "f7f2f10d7d1c65f4aa2b4e518e688029";
    let cityElement = document.querySelector("#city-name");
    cityElement.innerHTML = city;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeatherCondition);
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

// When click on "Current location" button
function displayCurrentLocationandWeather(){
    navigator.geolocation.getCurrentPosition(findLocation);
}

let celsiusTemperature = null;

// Default location and temperature when loading page
displayWeatherBasedOnCity("Paris");

// Update location and temperature when searching for place
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCityAndWeatherWhenSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);