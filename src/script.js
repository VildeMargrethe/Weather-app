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
    
        function convertToFahrenheit(event){
            event.preventDefault();
            let temperatureElement = document.querySelector("#temperature");
           temperatureElement.innerHTML = 66;

    }

            function convertToCelsius(event){
            event.preventDefault();
            let temperatureElement = document.querySelector("#temperature");
            temperatureElement.innerHTML = 19;
    }

// Update date
let currentTime = new Date();
let link = document.querySelector("#date");
link.innerHTML = formateDate(currentTime);

// let user search for city
//let form = document.querySelector("#search-form");
//form.addEventListener("submit", search);
   

// unit converter challenge
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

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
  let temperature = Number(response.data.main.temp);
  let roundedTemp = Math.round(temperature);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${roundedTemp}`;
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

// When click on "Current location" button
function displayCurrentLocationandWeather(){
    navigator.geolocation.getCurrentPosition(findLocation);
}

// Default location and temperature when loading page
displayWeatherBasedOnCity("Paris");

// Update location and temperature when searching for place
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCityAndWeatherWhenSearch);

// Current location button
let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", displayCurrentLocationandWeather);