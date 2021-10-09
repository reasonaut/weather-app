import './style.css';

const apiKey = '9859218e34307ba8d4e0feb95142c9fb';
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const cityInput = document.querySelector('#city-search');
const citySubmit = document.querySelector('button')
const description = document.querySelector('.description');
const city = document.querySelector('.location');
const currentTemp = document.querySelector('.current-temp');
const maxTemp = document.querySelector('.max-temp');
const minTemp = document.querySelector('.min-temp');
const humidity = document.querySelector('.humidity');

citySubmit.addEventListener('click', submitRequest);
const testCity = 'Philadelphia';
const url = `${apiUrl + testCity}&appid=${apiKey}&units=imperial`;
console.log(url);

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

async function submitRequest(e) {
    const requestCity = cityInput.value;
    const requestUrl = `${apiUrl + requestCity}&appid=${apiKey}&units=imperial`;
    const response = await fetchCityData(requestUrl);
    console.log(response);
    const data = processResponse(response);
    updateCityWeather(data);

}

function updateCityWeather(data) {
    description.textContent = data.description;
    city.textContent = data.city;

}

fetchCityData(url).then(res => console.log(processResponse(res)));



