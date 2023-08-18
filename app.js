const cityName = document.getElementById('city-name');
const fetchBtn = document.getElementById('fetch-weather');
const apiKey = `132181ba0bfc716f8f00e2f8d6a7163f`;
const displayCity = document.getElementById('display-city');
const displayWeather = document.getElementById('display-temp');
const weatherInfo = document.getElementById('w-info');
const loader = document.getElementById('loader')

fetchBtn.addEventListener('click',function(){
    console.log(cityName.value);
    fetchWeather();
})

async function fetchWeather(){
    loader.style.display = 'flex';
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`)
    .then(function(responce){
        return responce.json();
    }).then(function(result){
        displayData(result);
    }).catch(function(error){
        document.getElementById('w-info').textContent = `Can't fetch data or City not found`;
    })
}

function displayData(data){
    loader.style.display = 'none';
    weatherInfo.style.display = 'block';
    console.log(data);
    const degreeSymbol = document.createElement('span');
    degreeSymbol.innerHTML = '&deg;C';
    displayWeather.textContent = Math.floor(data.main.temp);
    displayWeather.appendChild(degreeSymbol);
    const icon = document.getElementById('icon');
    icon.className ="fa-solid fa-location-dot";
    const weatherDesc = document.getElementById('w-desc');
    weatherDesc.textContent = data.weather[0].main;
    const country = data.sys.country;
    displayCity.textContent = data.name + ',' + country;
    const degreeSymbol1 = document.createElement('span');
    degreeSymbol1.innerHTML = '&deg;C';
    const feelsLike = document.getElementById('feels-like');
    feelsLike.textContent = Math.floor(data.main.feels_like);
    feelsLike.appendChild(degreeSymbol1);
    const humidity = document.getElementById('humidity');
    humidity.textContent = data.main.humidity + '%';

}