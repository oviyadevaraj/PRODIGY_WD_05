const apiKey = 'd8259a7cdb635ba0c8e3ab5bf267f0d5'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', function () {
    const location = document.getElementById('location-input').value;
    if (location) {
        getWeather(location);
    }
});

function getWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert("Location not found. Please enter a valid location.");
            }
        })
        .catch(error => {
            console.error("Error fetching the weather data:", error);
        });
}

function displayWeather(data) {
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} km/h`;

    // Set weather image based on the condition
    const weatherCondition = data.weather[0].main.toLowerCase();
    const weatherImage = document.getElementById('weather-image');

    if (weatherCondition.includes('clear')) {
        weatherImage.src = 'clear.png'; // Path to your sunny image
    } else if (weatherCondition.includes('clouds')) {
        weatherImage.src = 'cloud.png'; // Path to your cloudy image
        } else if (weatherCondition.includes('clouds')) {
        weatherImage.src = 'mist.png'; // Path to your cloudy image
    } else if (weatherCondition.includes('rain')) {
        weatherImage.src = 'rain.png'; // Path to your rainy image
    } else if (weatherCondition.includes('snow')) {
        weatherImage.src = 'snow.png'; // Path to your snowy image
    } else {
        weatherImage.src = '404.png'; // Path to a default image
    }
}
