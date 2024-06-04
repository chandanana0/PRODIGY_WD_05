const apiKey = '754cfaaf568971417c23e04be5cedd17'; 

function fetchWeather() {
    const location = document.getElementById('location').value;
    console.log('Fetching weather for location:', location);
    if (location) {
        getWeatherData(location);
    } else {
        alert("Please enter a location");
    }
}

function getCurrentLocation() {
    console.log('Fetching weather for current location');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log('Current position:', lat, lon);
            getWeatherDataByCoords(lat, lon);
        }, error => {
            alert("Geolocation not supported or permission denied");
        });
    } else {
        alert("Geolocation not supported by this browser");
    }
}

function getWeatherData(location) {
    console.log('Getting weather data for:', location);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            console.log('Weather data response:', response);
            if (!response.ok) {
                response.json().then(errorData => {
                    console.error('Error fetching weather data:', errorData);
                    alert(`Error: ${errorData.message}`);
                });
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);
            displayWeatherData(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherDataByCoords(lat, lon) {
    console.log('Getting weather data by coordinates:', lat, lon);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            console.log('Weather data response:', response);
            if (!response.ok) {
                response.json().then(errorData => {
                    console.error('Error fetching weather data:', errorData);
                    alert(`Error: ${errorData.message}`);
                });
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);
            displayWeatherData(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        document.getElementById('city').textContent = `Weather in ${data.name}`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity} %`;
        document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    } else {
        alert(`Error: ${data.message}`);
    }
}
