import './style.css';

const apiKey = '9859218e34307ba8d4e0feb95142c9fb';
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';

const testCity = 'minneapolis';
const url = `${apiUrl + testCity}&appid=${apiKey}&units=imperial`;
console.log(url);

async function fetchCityData(url) {
    try {
        const data = await fetch(url).then((response) => response.json());
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
fetchCityData(url).then(res => console.log(processResponse(res)));


// collect temp current, high, low
function processResponse(response) {
    let data = {};
    data.currentTemp = response.main.temp;
    data.maxTemp = response.main.temp_max;
    data.minTemp = response.main.temp_min;
    return data;
}
