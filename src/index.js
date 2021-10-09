import './style.css';

const apiKey = '9859218e34307ba8d4e0feb95142c9fb';
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const cityInput = document.querySelector('#city-search');
const citySubmit = document.querySelector('button');
const searchError = document.querySelector(".search-error");
const description = document.querySelector('.description');
const city = document.querySelector('.location');
const currentTemp = document.querySelector('.current-temp');
const maxTemp = document.querySelector('.max-temp');
const minTemp = document.querySelector('.min-temp');
const humidity = document.querySelector('.humidity');
const degree = '\u00B0';

async function fetchCityData(url) {
    try {
        const data = await fetch(url).then((response) => response.json());
        return data;
    } catch (error) {
        return console.error('Error:', error);
    }
}

// collect name, current temp, high, low, humidity, description from response
function processResponse(response) {
    const data = {};
    data.city = response.name;
    data.currentTemp = response.main.temp;
    data.maxTemp = response.main.temp_max;
    data.minTemp = response.main.temp_min;
    data.humidity = response.main.humidity;
    data.description = response.weather[0].description;
    return data;
}



function updateCityWeather(data) {
    description.textContent = data.description;
    city.textContent = data.city;
    currentTemp.textContent = data.currentTemp + degree;
    maxTemp.textContent = data.maxTemp + degree;
    minTemp.textContent = data.minTemp + degree;
    humidity.textContent = `${data.humidity}%`;
}

async function submitRequest() {
    searchError.textContent = '';
    const requestCity = cityInput.value;
    const requestUrl = `${apiUrl + requestCity}&appid=${apiKey}&units=imperial`;
    const response = await fetchCityData(requestUrl);
    if (!response || response.cod === '404') {
        searchError.textContent = response.message;
        return;
    }
    const data = processResponse(response);
    updateCityWeather(data);
}

function checkSubmit(e) {
    if (e && e.keyCode === 13) {
        submitRequest();
    }
}
citySubmit.addEventListener('click', submitRequest);
cityInput.addEventListener('keypress', checkSubmit)