document.addEventListener('DOMContentLoaded', async function() {
    const apiKey = 'c245bc91f5fd4e69a6403456242208';
    
    async function fetchWeatherData(cityName) {
        const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`;

        try {
            const response = await fetch(apiEndpoint);
            const weatherData = await response.json();
            
            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = '';
            
            weatherData.forecast.forecastday.forEach(element => {
                weatherContainer.innerHTML += `
                    <div class="weather-container">
                        <div class="weather-item">
                            <img src="https:${element.day.condition.icon}" alt="Weather Icon">
                        </div>
                        <div class="weather-item">
                            <span class="label">Current Date:</span>
                            <span class="value">${element.date}</span>
                        </div>
                        <div class="weather-item">
                            <span class="label">Weather Information:</span>
                            <span class="value">${element.day.condition.text}</span>
                        </div>
                        <div class="weather-item">
                            <span class="label">Temperature:</span>
                            <span class="value">${element.day.avgtemp_c}°C</span>
                        </div>
                        <div class="weather-item">
                            <span class="label">Humidity:</span>
                            <span class="value">${element.day.avghumidity}%</span>
                        </div>
                    </div>
                `;
            });
        } catch (error) {
            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = `<p>Unable to retrieve weather data: ${error.message}</p>`;
        }
    }

    // Fetch initial weather data for the default city
    fetchWeatherData('Iligan');

    document.getElementById('searchButton').addEventListener('click', () => {
        const cityInput = document.getElementById('cityInput').value;
        if (cityInput) {
            document.querySelector('.location-label').innerText = cityInput;
            fetchWeatherData(cityInput);
        } else {
            alert('Please enter a city name');
        }
    });
});
